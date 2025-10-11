import DB from "../config/db.js";
import { bookingTemplate } from "../utils/bookingTemplate.js";
import { sendBookingEmail } from "../utils/mail.js";
import { errorResponse, successResponse } from "../utils/response.js";

// get all my reservations
export const fetchAllReservations = async (req, res) => {
    try {
        const { user } = req;
        if (user.role === "ADMIN") {
            const allReservations = await DB.reservation.findMany({
                include: {
                    seat: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            // Remove password field from user object in each reservation
            const safeReservationData = allReservations.map((reservation) => {
                const { user: userObj, ...rest } = reservation;
                if (userObj) {
                    const { password, ...safeUser } = userObj;
                    return { ...rest, user: safeUser };
                }
                return reservation;
            });

            // console.log(safeReservationData);
            return successResponse(
                res,
                "All reservations",
                safeReservationData,
                200
            );
        } else {
            const myReservations = await DB.reservation.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    seat: true,
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

        // Check if the seat is already reserved for the given date
        const existingReservation = await DB.reservation.findUnique({
            where: {
                seatId_date: {
                    seatId,
                    date: formattedDate,
                },
            },
        });

        if (existingReservation) {
            return errorResponse(
                res,
                "This seat is already reserved for the selected date",
                undefined,
                409
            );
        }

        const reservationData = {
            userId,
            seatId,
            date: formattedDate,
            time,
            purpose,
            status,
        };

        // make the reservation
        const reservation = await DB.reservation.create({
            data: reservationData,
            include: {
                seat: true,
                user: true,
            },
        });

        let safeReservationInfo;

        // Destructure the reservation and separate user object
        const { user: userObj, ...rest } = reservation;
        if (userObj) {
            // Destructure the userObj and separate password
            const { password, ...safeUser } = userObj;
            // Return rest and user object without password
            safeReservationInfo = { ...rest, user: safeUser };
        } else {
            safeReservationInfo = reservation;
        }

        // console.log("After create reservation safe data", safeReservationInfo);

        const data = {
            username: safeReservationInfo.user.firstName,
            bookingId: safeReservationInfo.id,
            seatNumber: safeReservationInfo.seat.seatNumber,
            date: safeReservationInfo.date,
            time: safeReservationInfo.time,
            location: safeReservationInfo.seat.location,
            createdAt: new Date(),
            viewUrl: null,
            year: new Date().getFullYear(),
        };
        const userEmail = safeReservationInfo.user.email;
        const subject = "Your Seat Reservation Has Been Confirmed";

        const sendEmail = sendBookingEmail(
            userEmail,
            subject,
            bookingTemplate(data)
        );

        let emailSuccess;
        if (sendEmail) {
            emailSuccess = "Confirmation email sent.";
        } else {
            emailSuccess = "Failed to send confirmation email!";
        }

        return successResponse(
            res,
            `Reservation successfully placed. ${emailSuccess}`,
            safeReservationInfo
        );
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
