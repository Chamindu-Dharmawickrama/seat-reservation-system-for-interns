import { Router } from "express";
import {
    addNewSeat,
    deleteSeat,
    getAllSeats,
    searchSeat,
    updateSeat,
} from "../controllers/seatController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const seatRouter = Router();

// Get All seats
seatRouter.get("/", authenticate, authorize(["INTERN", "ADMIN"]), getAllSeats);
seatRouter.post("/addSeat", authenticate, authorize("ADMIN"), addNewSeat);
seatRouter.delete("/delete/:id", authenticate, authorize("ADMIN"), deleteSeat);
seatRouter.get(
    "/searchSeat",
    authenticate,
    authorize(["INTERN", "ADMIN"]),
    searchSeat
);
seatRouter.put("/updateSeat/:id", authenticate, authorize("ADMIN"), updateSeat);

export default seatRouter;
