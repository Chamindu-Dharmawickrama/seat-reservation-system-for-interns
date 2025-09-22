import { Router } from "express";
import {
    deleteReservation,
    fetchAllReservations,
    makeReservation,
} from "../controllers/reservationController.js";

const reservationRouter = Router();

reservationRouter.get("/", fetchAllReservations);
reservationRouter.post("/newReservation", makeReservation);
reservationRouter.delete("/deleteReservation/:id", deleteReservation)

export default reservationRouter;
