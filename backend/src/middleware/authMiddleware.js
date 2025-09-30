import { verifyToken } from "../utils/jwt.js";
import { errorResponse } from "../utils/response.js";

// check if user is logged in and has a valid JWT token.
export const authenticate = (req, res, next) => {
    try {
        // get the authorization headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return errorResponse(
                res,
                "Authorization header missing",
                undefined,
                401
            );
        }

        // get the token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return errorResponse(res, "Token missing", undefined, 401);
        }

        // payload = user's data
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        errorResponse(res, "Invalid or expired token", error, 401);
    }
};

// check if user have the correct role/permissions to access certain resources.
export const authorize = (roles = []) => {
    // check roles are string
    if (typeof roles === "string") {
        roles = [roles];
    }
    return (req, res, next) => {
        // check user authonticate success
        if (!req.user) {
            return errorResponse(res, "Not authenticated", undefined, 401);
        }
        // check user role is in
        if (roles.length && !roles.includes(req.user.role)) {
            return errorResponse(
                res,
                "Forbidden: insufficient privileges",
                undefined,
                403
            );
        }
        //if role is there go next
        next();
    };
};
