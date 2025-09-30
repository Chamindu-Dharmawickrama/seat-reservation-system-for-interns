import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//When a user logs in successfully,  call signToken(userData) to issue them a JWT
//payload → the data you want inside the token (usually user id, role, email, etc).
export function signToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7D",
    });
}

//If the token was signed with the same secret key.
//If the token has not expired
//If valid → it decodes and returns the payload,  payload included user data that in the token 
//If invalid → it throws an error (JsonWebTokenError, TokenExpiredError, etc.).
export function verifyToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
