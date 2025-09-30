import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getMe,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorize("ADMIN"), getAllUsers);
userRouter.get("/getMe/:id", getMe);
userRouter.delete(
    "/deleteUser/:id",
    authenticate,
    authorize("ADMIN"),
    deleteUser
);

export default userRouter;
