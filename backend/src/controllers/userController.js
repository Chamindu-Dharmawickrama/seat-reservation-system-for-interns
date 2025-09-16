import DB from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await DB.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return successResponse(res, "Users retrieved", users);
    } catch (error) {
        return errorResponse(res, "Failed to retrieve users", error.message);
    }
};

// get my details (profile)
export const getMe = async (req, res) => {
    try {
        const user = await DB.user.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!user) return errorResponse(res, "User not found", undefined, 404);

        const safe = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role,
            department: user.department,
            university: user.university,
            phone: user.phone,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };

        return successResponse(res, "Profile retrieved", safe);
    } catch (error) {
        return errorResponse(res, "Failed to fetch profile", err.message);
    }
};

// delete user 
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // check user is exists
        const existingUser = await DB.user.findUnique({
            where: {
                id,
            },
        });

        if (!existingUser)
            return errorResponse(res, "User not Found", undefined, 404);

        // delete reservation - one user can boook multiple reservations
        const userReservation = await DB.reservation.deleteMany({
            where: {
                userId: id,
            },
        });
        // delete user
        const user = await DB.user.delete({
            where: {
                id,
            },
        });

        return successResponse(res, "User deleted", user);
    } catch (error) {
        return errorResponse(res, "Failed to delete user", error.message);
    }
};
