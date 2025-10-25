import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
    loginRateLimiter,
    signupRateLimiter,
} from "../middleware/rateLimitMiddleware.js";

const authRouter = Router();

authRouter.post("/login", loginRateLimiter, login);
authRouter.post("/register", signupRateLimiter, register);

export default authRouter;
