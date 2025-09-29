import { Router } from "express";
import { login } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", login);
// authRouter.post("/register")

export default authRouter;
