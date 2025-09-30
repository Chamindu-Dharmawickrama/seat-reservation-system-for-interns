import DB from "../config/db.js";
import { signToken } from "../utils/jwt.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";

// login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return errorResponse(
                res,
                "Username or Password field cannot be empty",
                undefined,
                400
            );
        }

        const user = await DB.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return errorResponse(res, "Invalid credentials", undefined, 401);
        }

        //Compare plain password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return errorResponse(res, "Invalid credentials", undefined, 401);
        }

        if (!user.isActive) {
            return errorResponse(res, "Account deactivated", undefined, 403);
        }

        // success response
        // create token including id and role
        const token = signToken({
            id: user.id,
            role: user.role,
            firstName: user.firstName,
            email: user.email,
        });

        // safe user data
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return successResponse(
            res,
            "User login successfully",
            { token, user: safeUser },
            200
        );
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};

const SALT_ROUNDS = 10;

// register
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            internId,
            department,
            university,
            startDate,
            endDate,
            username,
            password,
            confirmPassword,
        } = req.body;

        // check missing fields
        if (
            !firstName ||
            !phone ||
            !lastName ||
            !internId ||
            !department ||
            !university ||
            !startDate ||
            !endDate ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            return errorResponse(
                res,
                "Missing required fields",
                undefined,
                400
            );
        }

        // check email is allowed
        const allowedEmail = await DB.allowedEmail.findUnique({
            where: {
                email,
            },
        });
        if (!allowedEmail) {
            return errorResponse(
                res,
                "This email is not authorized to register. Contact admin.",
                null,
                403
            );
        }

        if (password !== confirmPassword) {
            return errorResponse(
                res,
                "The confirm password does not match the password",
                null,
                400
            );
        }

        // check email or user name already register
        const existing = await DB.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existing) {
            return errorResponse(
                res,
                "User with email or username already exists",
                null,
                400
            );
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const role = "INTERN";
        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();

        const user = await DB.user.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                username,
                password: hashedPassword,
                role,
                internId,
                department,
                university,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            },
        });

        return successResponse(
            res,
            "User created successfully",
            user.username,
            201
        );
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};
