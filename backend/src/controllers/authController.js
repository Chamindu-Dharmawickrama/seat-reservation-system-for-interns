import DB from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return errorResponse(
            res,
            "Username or Password field cannot be empty",
            undefined,
            400
        );
    }

    const user = await DB.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        return errorResponse(res, "Invalid credentials", undefined, 401);
    }

    //Compare plain password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return errorResponse(res, "Invalid credentials", undefined, 401);
    }

    if (!user.isActive) {
        return errorResponse(res, "Account deactivated", undefined, 403);
    }

    // success response
    return successResponse(res, "User Login", undefined, 200);
};
