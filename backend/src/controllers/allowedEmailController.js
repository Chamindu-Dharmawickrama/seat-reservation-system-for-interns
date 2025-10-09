import DB from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

// add allowed email
export const addAllowedEmail = async (req, res) => {
    try {
        const { email, traineeId } = req.body;

        // validation
        if (!traineeId)
            return errorResponse(res, "TraineeId is requires", undefined, 400);
        if (!email)
            return errorResponse(res, "Email is required", undefined, 400);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return errorResponse(res, "Invalid email format", undefined, 400);

        const existsEmial = await DB.allowedEmail.findUnique({
            where: {
                email,
            },
        });

        if (existsEmial)
            return errorResponse(
                res,
                "This Email already allowed",
                undefined,
                409
            );

        const allowedEmail = await DB.allowedEmail.create({
            data: {
                email,
                traineeId,
            },
        });

        return successResponse(res, "Allowed email added", allowedEmail, 201);
    } catch (error) {
        return errorResponse(res, "Failed to add allowed email", error.message);
    }
};

// view allowed emails
export const getAllowedEmails = async (req, res) => {
    try {
        const allowedEmails = await DB.allowedEmail.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return successResponse(
            res,
            "Allowed emails retrieved",
            allowedEmails,
            200
        );
    } catch (error) {
        return errorResponse(
            res,
            "Failed to get allowed emails",
            error.message
        );
    }
};

// delete allowed emails
export const deleteAllowedEmails = async (req, res) => {
    try {
        const { id } = req.params;

        const existsEmial = await DB.allowedEmail.findUnique({
            where: {
                id,
            },
        });

        if (!existsEmial)
            return errorResponse(res, "Email not found", undefined, 404);

        const deletedAllowedEmail = await DB.allowedEmail.delete({
            where: {
                id,
            },
        });

        return successResponse(
            res,
            "Allowed email deleted",
            deletedAllowedEmail,
            200
        );
    } catch (error) {
        return errorResponse(
            res,
            "Failed to delete allowed email",
            error.message
        );
    }
};
