import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// full path for the current directry
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend root directory
dotenv.config({ path: join(__dirname, "../../.env") });

const user = process.env.FROM_EMAIL;
const pass = process.env.FROM_PASS;

let mailServer;

if (user && pass) {
    mailServer = createTransport({
        service: "gmail",
        auth: {
            user,
            pass,
        },
    });
} else {
    mailServer = null;
    console.warn("SMTP not configured. Emails will not be sent.");
}

// send mails
export const sendBookingEmail = async (to, subject, html) => {
    if (!mailServer) {
        console.warn("Skipping email: transporter not configured");
        return null;
    }

    const info = await mailServer.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
    });
    return info;
};
