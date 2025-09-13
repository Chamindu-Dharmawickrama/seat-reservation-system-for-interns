import DB from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

//get all seats
export const getAllSeats = async (req, res) => {
    try {
        const seats = await DB.seat.findMany();
        successResponse(res, "All seats retrieved successfully", seats);
    } catch (error) {
        errorResponse(res, "Failed to retrieve seats", error.message);
    }
};

// search seat by seatNumber and filters
export const searchSeat = async (req, res) => {
    try {
        const { seatNumber, status } = req.query;

        console.log(seatNumber);
        console.log(status);

        // Build dynamic filter object
        const filter = {};

        // Search by seatNumber (partial match, case-insensitive)
        if (seatNumber) {
            filter.seatNumber = {
                contains: seatNumber, // matches partial input
                mode: "insensitive",
            };
        }

        //if status == all , not set the filter status ( give seats without filtering)
        if (status && status !== "all") {
            filter.status = status;
        }

        console.log("Filter ", filter);

        const seats = await DB.seat.findMany({
            where: filter,
        });

        //if seats not found
        if (!seats || seats.length === 0) {
            return errorResponse(res, "No seats found!", undefined, 404);
        }

        // if seats found
        successResponse(res, "Seats found", seats);
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};

// create a new seat
export const addNewSeat = async (req, res) => {
    try {
        const { seatNumber, floor, location, status } = req.body;

        console.table([req.body]);

        // check required fields
        if (!seatNumber || !floor || !location || !status) {
            errorResponse(res, "Missing required fields", undefined, 400);
        }

        // check if seatNumber is already exists
        const existingSeat = await DB.seat.findUnique({
            where: { seatNumber },
        });
        if (existingSeat) {
            errorResponse(
                res,
                "Seat with this number already exists",
                undefined,
                409
            );
        }

        // create new seat
        const seat = await DB.seat.create({
            data: {
                seatNumber,
                floor,
                location,
                status,
            },
        });

        successResponse(res, "Seat created successfully", seat, 201);
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};

// update seat
export const updateSeat = async (req, res) => {
    try {
        const { id } = req.params;
        const { seatNumber, floor, location, status } = req.body;

        // check required fields
        if (!floor || !location || !status) {
            errorResponse(res, "Missing required fields", undefined, 400);
        }

        // check the seat is exists
        const existingSeat = await DB.seat.findUnique({
            where: { id },
        });
        if (!existingSeat) {
            errorResponse(res, "Seat not found", undefined, 404);
        }

        //update seat
        const seat = await DB.seat.update({
            where: {
                id,
            },
            data: {
                floor,
                location,
                status,
            },
        });

        successResponse(res, "Seat updated successfully", seat);
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};

// delete seat
export const deleteSeat = async (req, res) => {
    try {
        const { id } = req.params;

        //check the seat is exist
        const existingSeat = await DB.seat.findUnique({
            where: {
                id,
            },
        });
        if (!existingSeat) {
            errorResponse(res, "The seat not found", undefined, 404);
        }

        // delete seat
        const seat = await DB.seat.delete({
            where: {
                id,
            },
        });

        successResponse(res, "Seat deleted successfully");
    } catch (error) {
        errorResponse(res, error.message, error);
    }
};
