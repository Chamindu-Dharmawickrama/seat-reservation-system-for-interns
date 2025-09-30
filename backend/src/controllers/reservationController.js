import DB from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

// get all reservations
export const fetchAllReservations = async (req, res) => {
    try {
        const { user } = req;
        if (user.role === "ADMIN") {
            const allReservations = await DB.reservation.findMany();
            return successResponse(
                res,
                "All reservations",
                allReservations,
                200
            );
        } else {
            const myReservations = await DB.reservation.findMany({
                where: {
                    userId: user.id,
                },
            });
            return successResponse(res, "My reservations", myReservations, 200);
        }
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
        const { userId, seatId, date, time, purpose, status } = req.body;

        if (!userId || !seatId || !date || !time || !status)
            return errorResponse(
                res,
                "Missing required fields",
                undefined,
                400
            );

        const formattedDate = new Date(date).toISOString();

        const reservationData = {
            userId,
            seatId,
            date: formattedDate,
            time,
            purpose,
            status,
        };

        const reservation = await DB.reservation.create({
            data: reservationData,
        });

        return successResponse(res, "Reservation palced");
    } catch (error) {
        return errorResponse(
            res,
            "Failed to make a reservation",
            error.message
        );
    }
};

// delete reservation
export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string")
            return errorResponse(res, "Invalid Id", undefined, 400);

        //existing reservation?
        const existingReservation = await DB.reservation.findUnique({
            where: {
                id,
            },
        });
        if (!existingReservation) {
            return errorResponse(res, "Reservation not found", undefined, 404);
        }

        const deletedReservation = await DB.reservation.delete({
            where: {
                id,
            },
        });

        return successResponse(res, "Reservation deleted ", deletedReservation);
    } catch (error) {
        return errorResponse(res, error.message, error);
    }
};
