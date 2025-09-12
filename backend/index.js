import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/db.js";
import DB from "./src/config/db.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());
  



// Start server
const startServer = async () => {
    await connectDatabase();

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
