import DB from "../config/db";
import { errorResponse, successResponse } from "../utils/response";

// get all reservations
export const getAllReservations = async (req, res) => {
    try {
        const allReservations = await DB.reservation.findMany();
        return successResponse(res, "All reservations", allReservations, 200);
    } catch (error) {
        return errorResponse(
            res,
            "Failed to fetch reservations",
            error.message
        );
    }
};

// make a reservation
export const makeReservation = async (req, res) => {
    try {
        const { userId, seatId, date, time, purpose } = req.body;

        const reservation = await DB.reservation.create({});

        return successResponse(res, "Reservation palced");
    } catch (error) {
        return errorResponse(
            res,
            "Failed to make a reservation",
            error.message
        );
    }
};
