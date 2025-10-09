import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient To interact with the database using Prisma's API
const DB = new PrismaClient();

export default DB;

// Function to test database connection
export const connectDatabase = async () => {
    try {
        await DB.$connect();
        console.log("Database connection successful!");
        return true;
    } catch (error) {
        console.log(error);
        console.log("Database connection not successful!");
        return false;
    }
};
