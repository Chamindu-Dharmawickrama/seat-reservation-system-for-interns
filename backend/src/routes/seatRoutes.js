import { Router } from "express";
import {
    addNewSeat,
    deleteSeat,
    getAllSeats,
    searchSeat,
    updateSeat,
} from "../controllers/seatController.js";

const seatRouter = Router();

// Get All seats
seatRouter.get("/", getAllSeats);
seatRouter.post("/addSeat", addNewSeat);
seatRouter.delete("/delete/:id", deleteSeat);
seatRouter.get("/searchSeat", searchSeat);
seatRouter.put("/updateSeat/:id", updateSeat)

export default seatRouter;
