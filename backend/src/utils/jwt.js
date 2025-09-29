import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//When a user logs in successfully,  call signToken(userData) to issue them a JWT
//payload → the data you want inside the token (usually user id, role, email, etc).
export function signToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7D",
    });
}
