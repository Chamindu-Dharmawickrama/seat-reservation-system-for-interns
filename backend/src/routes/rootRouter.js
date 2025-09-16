import { Router } from "express";
import seatRouter from "./seatRoutes.js";
import userRouter from "./userRouter.js";
import allowedEmailsRouter from "./allowedEmailRoutes.js";

const rootRouter = Router();

rootRouter.use("/seats", seatRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/allowedEmails", allowedEmailsRouter);

export default rootRouter;
