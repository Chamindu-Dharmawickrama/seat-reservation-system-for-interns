import { Router } from "express";
import seatRouter from "./seatRoutes.js";
import userRouter from "./userRouter.js";
import allowedEmailsRouter from "./allowedEmailRoutes.js";
import reservationRouter from "./reservationRoutes.js";

const rootRouter = Router();

rootRouter.use("/seats", seatRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/allowedEmails", allowedEmailsRouter);
rootRouter.use("/reservations", reservationRouter);

export default rootRouter;
