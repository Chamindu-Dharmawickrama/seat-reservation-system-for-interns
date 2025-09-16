import { Router } from "express";
import { deleteUser, getAllUsers, getMe } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/getMe/:id", getMe);
userRouter.delete("/deleteUser/:id", deleteUser)

export default userRouter;
