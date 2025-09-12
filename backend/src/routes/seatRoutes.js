import { Router } from "express";
import {
    addNewSeat,
    deleteSeat,
    getAllSeats,
    searchSeat,
} from "../controllers/seatController.js";

const seatRouter = Router();

// Get All seats
seatRouter.get("/", getAllSeats);
seatRouter.post("/addSeat", addNewSeat);
seatRouter.delete("/delete/:id", deleteSeat);
seatRouter.get("/searchSeat", searchSeat);

export default seatRouter;
