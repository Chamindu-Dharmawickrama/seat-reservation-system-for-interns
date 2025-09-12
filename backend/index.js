import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/db.js";
import DB from "./src/config/db.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());
  

//helath check
server.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Seat Reservation System API is running",
        timestamp: new Date().toString(),
        // app's environment (e.g., 'development', 'production')
        environment: process.env.NODE_ENV,
    });

});


// Start server
const startServer = async () => {
    await connectDatabase();

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
