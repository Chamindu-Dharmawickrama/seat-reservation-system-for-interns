import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();

const PORT = process.env.PORT || 4000;

server.get("/",(req,res)=>{
    res.status(200).json({
        message:"The server processes an incoming client request"
    })
})

//run the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
