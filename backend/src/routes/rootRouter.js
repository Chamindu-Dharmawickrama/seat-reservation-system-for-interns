import { Router } from "express";
import seatRouter from "./seatRoutes.js";

const rootRouter = Router();

rootRouter.use("/seats", seatRouter);

export default rootRouter;
