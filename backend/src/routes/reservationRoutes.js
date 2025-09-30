import { Router } from "express";
import {
    deleteReservation,
    fetchAllReservations,
    makeReservation,
} from "../controllers/reservationController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const reservationRouter = Router();

reservationRouter.get("/",authenticate, authorize(["INTERN", "ADMIN"]), fetchAllReservations);
reservationRouter.post("/newReservation",authenticate, authorize(["INTERN", "ADMIN"]), makeReservation);
reservationRouter.delete("/deleteReservation/:id",authenticate, authorize(["INTERN", "ADMIN"]), deleteReservation)

export default reservationRouter;
