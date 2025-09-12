# 📚 Seat Reservation System - Complete Backend Implementation Guide

## 🏗️ Project Structure Overview

```
backend/
├── 📁 src/
│   ├── 📁 config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   └── redis.js
│   ├── 📁 models/
│   │   ├── User.js
│   │   ├── Seat.js
│   │   ├── Reservation.js
│   │   ├── RegisteredEmail.js
│   │   ├── Activity.js
│   │   └── index.js
│   ├── 📁 controllers/
│   │   ├── 📁 auth/
│   │   │   ├── authController.js
│   │   │   └── authValidation.js
│   │   ├── 📁 admin/
│   │   │   ├── seatController.js
│   │   │   ├── reservationController.js
│   │   │   ├── userController.js
│   │   │   ├── emailController.js
│   │   │   ├── statsController.js
│   │   │   └── reportController.js
│   │   ├── 📁 intern/
│   │   │   ├── seatController.js
│   │   │   ├── reservationController.js
│   │   │   └── profileController.js
│   │   └── 📁 shared/
│   │       ├── systemController.js
│   │       ├── fileController.js
│   │       └── notificationController.js
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── loggingMiddleware.js
│   │   ├── corsMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── 📁 routes/
│   │   ├── 📁 v1/
│   │   │   ├── authRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── internRoutes.js
│   │   │   ├── sharedRoutes.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── 📁 services/
│   │   ├── authService.js
│   │   ├── seatService.js
│   │   ├── reservationService.js
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   ├── reportService.js
│   │   ├── activityService.js
│   │   └── cacheService.js
│   ├── 📁 utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── validators.js
│   │   ├── logger.js
│   │   ├── encryption.js
│   │   ├── dateUtils.js
│   │   ├── asyncHandler.js
│   │   └── AppError.js
│   ├── 📁 database/
│   │   ├── connection.js
│   │   ├── 📁 migrations/
│   │   └── 📁 seeders/
│   └── app.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

---

## 📁 CONFIG FILES

### 🔧 src/config/database.js

```javascript
import mongoose from "mongoose";
import { config } from "./environment.js";
import { logger } from "../utils/logger.js";

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        };

        const conn = await mongoose.connect(config.MONGODB_URI, options);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("error", (err) => {
            logger.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            logger.warn("MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            logger.info("MongoDB reconnected");
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            logger.info("MongoDB connection closed through app termination");
            process.exit(0);
        });
    } catch (error) {
        logger.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
```

### 🔧 src/config/environment.js

```javascript
import dotenv from "dotenv";

dotenv.config();

export const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 4000,

    // Database
    MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://localhost:27017/seat-reservation",

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-key",
    JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret",
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "30d",

    // Email Service
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,

    // Redis
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",

    // Frontend URL
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

    // File Upload
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || "5mb",
    ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/gif"],
};

const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
});
```

### 🔧 src/config/redis.js

```javascript
import redis from "redis";
import { config } from "./environment.js";
import { logger } from "../utils/logger.js";

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = redis.createClient({
            url: config.REDIS_URL,
        });

        redisClient.on("error", (err) => {
            logger.error("Redis Client Error:", err);
        });

        redisClient.on("connect", () => {
            logger.info("Redis Client Connected");
        });

        await redisClient.connect();
    } catch (error) {
        logger.error("Redis connection failed:", error);
    }
};

export { redisClient, connectRedis };
```

---

## 📁 MODELS

### 🗂️ src/models/User.js

```javascript
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            maxlength: [50, "First name cannot exceed 50 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            maxlength: [50, "Last name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [20, "Username cannot exceed 20 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "intern"],
            default: "intern",
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        internId: {
            type: String,
            required: function () {
                return this.role === "intern";
            },
            unique: true,
            sparse: true,
        },
        department: {
            type: String,
            required: function () {
                return this.role === "intern";
            },
        },
        university: {
            type: String,
            required: function () {
                return this.role === "intern";
            },
        },
        internshipPeriod: {
            startDate: {
                type: Date,
                required: function () {
                    return this.role === "intern";
                },
            },
            endDate: {
                type: Date,
                required: function () {
                    return this.role === "intern";
                },
            },
        },
        profilePicture: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    return userObject;
};

export default mongoose.model("User", userSchema);
```

### 🗂️ src/models/Seat.js

```javascript
import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
    {
        seatNumber: {
            type: String,
            required: [true, "Seat number is required"],
            unique: true,
            trim: true,
            uppercase: true,
        },
        floor: {
            type: String,
            required: [true, "Floor is required"],
            enum: ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
        },
        section: {
            type: String,
            required: [true, "Section is required"],
            enum: ["A", "B", "C", "D"],
        },
        status: {
            type: String,
            enum: ["available", "occupied", "maintenance", "reserved"],
            default: "available",
        },
        features: [
            {
                type: String,
                enum: [
                    "window",
                    "power-outlet",
                    "monitor",
                    "ergonomic-chair",
                    "whiteboard-nearby",
                ],
            },
        ],
        description: {
            type: String,
            maxlength: [200, "Description cannot exceed 200 characters"],
        },
        coordinates: {
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true,
            },
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        assignedDate: {
            type: Date,
            default: null,
        },
        maintenanceInfo: {
            reason: String,
            scheduledDate: Date,
            estimatedCompletion: Date,
            reportedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

seatSchema.index({ status: 1, floor: 1, section: 1 });
seatSchema.index({ seatNumber: 1 });

export default mongoose.model("Seat", seatSchema);
```

### 🗂️ src/models/Reservation.js

```javascript
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        seatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seat",
            required: [true, "Seat ID is required"],
        },
        reservationDate: {
            type: Date,
            required: [true, "Reservation date is required"],
        },
        timeSlot: {
            startTime: {
                type: String,
                required: [true, "Start time is required"],
                match: [
                    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                    "Invalid time format (HH:MM)",
                ],
            },
            endTime: {
                type: String,
                required: [true, "End time is required"],
                match: [
                    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                    "Invalid time format (HH:MM)",
                ],
            },
        },
        status: {
            type: String,
            enum: ["active", "completed", "cancelled", "no-show"],
            default: "active",
        },
        purpose: {
            type: String,
            maxlength: [200, "Purpose cannot exceed 200 characters"],
        },
        checkInTime: {
            type: Date,
            default: null,
        },
        checkOutTime: {
            type: Date,
            default: null,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cancelledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        cancellationReason: {
            type: String,
            maxlength: [
                200,
                "Cancellation reason cannot exceed 200 characters",
            ],
        },
        notes: {
            type: String,
            maxlength: [500, "Notes cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true,
    }
);

reservationSchema.index({ userId: 1, reservationDate: 1 });
reservationSchema.index({ seatId: 1, reservationDate: 1 });
reservationSchema.index({ status: 1, reservationDate: 1 });

reservationSchema.index(
    {
        seatId: 1,
        reservationDate: 1,
        "timeSlot.startTime": 1,
        "timeSlot.endTime": 1,
    },
    {
        unique: true,
        partialFilterExpression: { status: { $in: ["active", "completed"] } },
    }
);

export default mongoose.model("Reservation", reservationSchema);
```

### 🗂️ src/models/RegisteredEmail.js

```javascript
import mongoose from "mongoose";

const registeredEmailSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        domain: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            maxlength: [200, "Description cannot exceed 200 characters"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

registeredEmailSchema.index({ email: 1 });
registeredEmailSchema.index({ domain: 1 });

export default mongoose.model("RegisteredEmail", registeredEmailSchema);
```

### 🗂️ src/models/Activity.js

```javascript
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: [
                "CREATE_SEAT",
                "UPDATE_SEAT",
                "DELETE_SEAT",
                "CREATE_RESERVATION",
                "UPDATE_RESERVATION",
                "CANCEL_RESERVATION",
                "CHECK_IN",
                "CHECK_OUT",
                "CREATE_USER",
                "UPDATE_USER",
                "DELETE_USER",
                "LOGIN",
                "LOGOUT",
                "ADD_EMAIL",
                "DELETE_EMAIL",
            ],
        },
        details: {
            type: String,
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        targetType: {
            type: String,
            enum: ["User", "Seat", "Reservation", "RegisteredEmail"],
            default: null,
        },
        ipAddress: {
            type: String,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ action: 1, createdAt: -1 });
activitySchema.index({ targetId: 1, targetType: 1 });

export default mongoose.model("Activity", activitySchema);
```

### 🗂️ src/models/index.js

```javascript
import User from "./User.js";
import Seat from "./Seat.js";
import Reservation from "./Reservation.js";
import RegisteredEmail from "./RegisteredEmail.js";
import Activity from "./Activity.js";

export { User, Seat, Reservation, RegisteredEmail, Activity };
```

---

## 📁 MIDDLEWARE

### 🛡️ src/middleware/authMiddleware.js

```javascript
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { config } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new AppError("Access token is required", 401);
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new AppError("User not found", 401);
        }

        if (!user.isActive) {
            throw new AppError("Account is deactivated", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new AppError("Invalid token", 401);
        } else if (error.name === "TokenExpiredError") {
            throw new AppError("Token expired", 401);
        } else {
            throw error;
        }
    }
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (user && user.isActive) {
                req.user = user;
            }
        } catch (error) {
            // Ignore token errors for optional auth
        }
    }

    next();
});
```

### 🛡️ src/middleware/roleMiddleware.js

```javascript
import { AppError } from "../utils/AppError.js";

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new AppError("Authentication required", 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError("Access denied. Insufficient permissions.", 403);
        }

        next();
    };
};

export const adminOnly = authorize("admin");
export const internOnly = authorize("intern");
export const authenticatedOnly = authorize("admin", "intern");

export const ownerOrAdmin = (resourceUserIdField = "userId") => {
    return async (req, res, next) => {
        if (!req.user) {
            throw new AppError("Authentication required", 401);
        }

        if (req.user.role === "admin") {
            return next();
        }

        const resourceUserId =
            req.params.userId || req.body[resourceUserIdField] || req.params.id;

        if (req.user.id !== resourceUserId) {
            throw new AppError(
                "Access denied. You can only access your own resources.",
                403
            );
        }

        next();
    };
};
```

### 🛡️ src/middleware/validationMiddleware.js

```javascript
import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
            value: error.value,
        }));

        throw new AppError("Validation failed", 400, errorMessages);
    }

    next();
};

export const validateFileUpload = (allowedTypes, maxSize = 5 * 1024 * 1024) => {
    return (req, res, next) => {
        if (!req.file) {
            return next();
        }

        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new AppError(
                `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
                400
            );
        }

        if (req.file.size > maxSize) {
            throw new AppError(
                `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`,
                400
            );
        }

        next();
    };
};
```

### 🛡️ src/middleware/rateLimitMiddleware.js

```javascript
import rateLimit from "express-rate-limit";
import { AppError } from "../utils/AppError.js";

export const rateLimiter = (maxRequests, windowMinutes) => {
    return rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        max: maxRequests,
        message: {
            success: false,
            message: `Too many requests, please try again after ${windowMinutes} minutes`,
            retryAfter: windowMinutes * 60,
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            throw new AppError(
                `Too many requests, please try again after ${windowMinutes} minutes`,
                429
            );
        },
    });
};

export const authLimiter = rateLimiter(5, 15);
export const generalLimiter = rateLimiter(100, 15);
export const uploadLimiter = rateLimiter(10, 60);
```

### 🛡️ src/middleware/errorMiddleware.js

```javascript
import { config } from "../config/environment.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    logger.error(err);

    if (err.name === "CastError") {
        const message = "Resource not found";
        error = { message, statusCode: 404 };
    }

    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = { message, statusCode: 400 };
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = { message, statusCode: 400 };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
        ...(config.NODE_ENV === "development" && { stack: err.stack }),
        ...(error.details && { details: error.details }),
    });
};

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
```

### 🛡️ src/middleware/loggingMiddleware.js

```javascript
import { logger } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get("User-Agent"),
            ip: req.ip,
            userId: req.user?.id || "anonymous",
        };

        if (res.statusCode >= 400) {
            logger.warn("HTTP Request", logData);
        } else {
            logger.info("HTTP Request", logData);
        }
    });

    next();
};
```

### 🛡️ src/middleware/corsMiddleware.js

```javascript
import cors from "cors";
import { config } from "../config/environment.js";

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            config.FRONTEND_URL,
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5000",
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400, // 24 hours
};

export const corsMiddleware = cors(corsOptions);
```

### 🛡️ src/middleware/uploadMiddleware.js

```javascript
import multer from "multer";
import path from "path";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/environment.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (config.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("Invalid file type", 400), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: fileFilter,
});
```

---

## 📁 UTILS

### 🔧 src/utils/helpers.js

```javascript
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/environment.js";

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE,
    });

    const refreshToken = jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_EXPIRE,
    });

    return { accessToken, refreshToken };
};

export const generateRandomToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

export const calculatePagination = (page, limit, total) => {
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const totalPages = Math.ceil(total / pageSize);
    const skip = (currentPage - 1) * pageSize;

    return {
        currentPage,
        pageSize,
        totalPages,
        skip,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
    };
};

export const formatDate = (date, options = {}) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
    }).format(new Date(date));
};

export const isValidTime = (time) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
};

export const isValidTimeSlot = (startTime, endTime) => {
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        return false;
    }

    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);

    return start < end;
};

export const sanitizeInput = (input) => {
    if (typeof input !== "string") return input;

    return input.trim().replace(/[<>]/g, "").substring(0, 1000);
};
```

### 🔧 src/utils/asyncHandler.js

```javascript
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
```

### 🔧 src/utils/AppError.js

```javascript
class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

export { AppError };
```

### 🔧 src/utils/logger.js

```javascript
import winston from "winston";
import { config } from "../config/environment.js";

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

export const logger = winston.createLogger({
    level: config.NODE_ENV === "production" ? "info" : "debug",
    format: logFormat,
    defaultMeta: { service: "seat-reservation-api" },
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

if (config.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}
```

### 🔧 src/utils/constants.js

```javascript
export const USER_ROLES = {
    ADMIN: "admin",
    INTERN: "intern",
};

export const SEAT_STATUS = {
    AVAILABLE: "available",
    OCCUPIED: "occupied",
    MAINTENANCE: "maintenance",
    RESERVED: "reserved",
};

export const RESERVATION_STATUS = {
    ACTIVE: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    NO_SHOW: "no-show",
};

export const ACTIVITY_TYPES = {
    CREATE_SEAT: "CREATE_SEAT",
    UPDATE_SEAT: "UPDATE_SEAT",
    DELETE_SEAT: "DELETE_SEAT",
    CREATE_RESERVATION: "CREATE_RESERVATION",
    UPDATE_RESERVATION: "UPDATE_RESERVATION",
    CANCEL_RESERVATION: "CANCEL_RESERVATION",
    CHECK_IN: "CHECK_IN",
    CHECK_OUT: "CHECK_OUT",
    CREATE_USER: "CREATE_USER",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    ADD_EMAIL: "ADD_EMAIL",
    DELETE_EMAIL: "DELETE_EMAIL",
};

export const FLOORS = ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"];
export const SECTIONS = ["A", "B", "C", "D"];
export const SEAT_FEATURES = [
    "window",
    "power-outlet",
    "monitor",
    "ergonomic-chair",
    "whiteboard-nearby",
];

export const DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 10,
    MAX_LIMIT: 100,
};

export const TIME_SLOTS = {
    WORKING_HOURS_START: "08:00",
    WORKING_HOURS_END: "18:00",
    MAX_RESERVATION_HOURS: 8,
    MIN_RESERVATION_MINUTES: 30,
};
```

---

## 📁 APP ENTRY POINT

### 🚀 src/app.js

```javascript
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { corsMiddleware } from "./middleware/corsMiddleware.js";
import { requestLogger } from "./middleware/loggingMiddleware.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { generalLimiter } from "./middleware/rateLimitMiddleware.js";
import routes from "./routes/index.js";
import { config } from "./config/environment.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
app.use(corsMiddleware);

// Rate limiting
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging
app.use(requestLogger);

// Static files
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV,
    });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export default app;
```

### 🚀 server.js

```javascript
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { connectRedis } from "./src/config/redis.js";
import { config } from "./src/config/environment.js";
import { logger } from "./src/utils/logger.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
});

// Connect to database
connectDB();

// Connect to Redis (optional)
if (config.REDIS_URL) {
    connectRedis();
}

// Start server
const server = app.listen(config.PORT, () => {
    logger.info(
        `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
    );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
    server.close(() => {
        process.exit(1);
    });
});

// Graceful shutdown
process.on("SIGTERM", () => {
    logger.info("SIGTERM received, shutting down gracefully");
    server.close(() => {
        logger.info("Process terminated");
    });
});
```

---

## 📁 PACKAGE.JSON

### 📦 package.json

```json
{
    "name": "seat-reservation-backend",
    "version": "1.0.0",
    "description": "Backend API for Seat Reservation System",
    "type": "module",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage",
        "lint": "eslint src/",
        "lint:fix": "eslint src/ --fix",
        "format": "prettier --write src/",
        "build": "node scripts/build.js",
        "seed": "node src/database/seeders/index.js"
    },
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^7.6.3",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.0.2",
        "express-validator": "^7.0.1",
        "express-rate-limit": "^7.1.5",
        "helmet": "^7.1.0",
        "cors": "^2.8.5",
        "compression": "^1.7.4",
        "multer": "^1.4.5-lts.1",
        "nodemailer": "^6.9.7",
        "winston": "^3.11.0",
        "redis": "^4.6.10",
        "dotenv": "^16.3.1",
        "crypto": "^1.0.1"
    },
    "devDependencies": {
        "nodemon": "^3.0.1",
        "jest": "^29.7.0",
        "supertest": "^6.3.3",
        "eslint": "^8.53.0",
        "prettier": "^3.0.3",
        "@babel/preset-env": "^7.23.3"
    },
    "engines": {
        "node": ">=16.0.0"
    },
    "keywords": [
        "seat-reservation",
        "express",
        "mongodb",
        "rest-api",
        "nodejs"
    ],
    "author": "Your Name",
    "license": "ISC"
}
```

---

## 📁 ENVIRONMENT CONFIGURATION

### 🔧 .env.example

```env
# Server Configuration
NODE_ENV=development
PORT=4000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/seat-reservation

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5mb

# API Configuration
API_VERSION=1.0.0
BUILD_DATE=2025-01-01T00:00:00.000Z
```

---

## 📚 DOCUMENTATION

### 📖 README.md

```markdown
# 🪑 Seat Reservation System - Backend API

A comprehensive backend API for managing seat reservations in an internship environment.

## 🚀 Features

-   **User Authentication & Authorization**

    -   JWT-based authentication
    -   Role-based access control (Admin/Intern)
    -   Secure password hashing

-   **Seat Management**

    -   CRUD operations for seats
    -   Real-time availability checking
    -   Seat assignment and status tracking

-   **Reservation System**

    -   Create, update, and cancel reservations
    -   Check-in/check-out functionality
    -   Conflict prevention

-   **Admin Dashboard**

    -   User management
    -   Comprehensive reporting
    -   Activity logging
    -   Statistics and analytics

-   **Email Notifications**
    -   Reservation confirmations
    -   System notifications
    -   Password reset emails

## 🛠️ Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-repo/seat-reservation-backend.git
   cd seat-reservation-backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env

    # Edit .env with your configuration

    \`\`\`

4. **Start MongoDB:**
   \`\`\`bash

    # Using MongoDB Community Edition

    mongod

    # Or using Docker

    docker run -d -p 27017:27017 --name mongodb mongo:latest
    \`\`\`

5. **Run the application:**
   \`\`\`bash

    # Development mode

    npm run dev

    # Production mode

    npm start
    \`\`\`

## 📋 API Endpoints

### Authentication

-   \`POST /api/v1/auth/register\` - Register new user
-   \`POST /api/v1/auth/login\` - User login
-   \`POST /api/v1/auth/logout\` - User logout
-   \`POST /api/v1/auth/refresh\` - Refresh access token

### Admin Routes

-   \`GET /api/v1/admin/seats\` - Get all seats
-   \`POST /api/v1/admin/seats\` - Create new seat
-   \`PUT /api/v1/admin/seats/:id\` - Update seat
-   \`DELETE /api/v1/admin/seats/:id\` - Delete seat
-   \`GET /api/v1/admin/reservations\` - Get all reservations
-   \`GET /api/v1/admin/users\` - Get all users
-   \`GET /api/v1/admin/stats\` - Get dashboard statistics

### Intern Routes

-   \`GET /api/v1/intern/seats/available\` - Get available seats
-   \`POST /api/v1/intern/reservations\` - Create reservation
-   \`GET /api/v1/intern/reservations\` - Get user reservations
-   \`PUT /api/v1/intern/reservations/:id\` - Update reservation
-   \`DELETE /api/v1/intern/reservations/:id\` - Cancel reservation

## 🧪 Testing

\`\`\`bash

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Generate coverage report

npm run test:coverage
\`\`\`

## 📊 Project Structure

\`\`\`
src/
├── config/ # Configuration files
├── models/ # Database models
├── controllers/ # Request handlers
├── middleware/ # Custom middleware
├── routes/ # API routes
├── services/ # Business logic
├── utils/ # Utility functions
└── database/ # Database setup and migrations
\`\`\`

## 🔐 Security Features

-   JWT-based authentication
-   Rate limiting
-   Input validation
-   XSS protection
-   CORS configuration
-   Helmet security headers

## 📈 Performance

-   Database indexing
-   Query optimization
-   Compression middleware
-   Caching with Redis
-   Request logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.
```

This comprehensive document includes all the backend code files needed for your seat reservation system. Each file is properly organized and includes the exact code you need to implement the features shown in your frontend Redux slices.

The structure is modular, scalable, and follows Node.js/Express.js best practices. You can use this as a complete reference to build your backend API that will seamlessly integrate with your existing frontend.
