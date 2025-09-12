import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/db.js";
import DB from "./src/config/db.js";
import rootRouter from "./src/routes/rootRouter.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());

// use rootRouter
server.use("/api", rootRouter);

//health check
server.get("/health", async (req, res) => {
    try {
        await DB.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: "OK",
            timestamp: new Date().toISOString(),
            db: "Connected",
            message: `Server running on http://localhost:${PORT}`,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            db: "Disconnected",
            error: error.message,
        });
    }
});

// Start server
const startServer = async () => {
    await connectDatabase();
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
