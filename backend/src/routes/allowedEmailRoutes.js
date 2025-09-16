import { Router } from "express";
import {
    addAllowedEmail,
    deleteAllowedEmails,
    getAllowedEmails,
} from "../controllers/allowedEmailController.js";

const allowedEmailsRouter = Router();

allowedEmailsRouter.get("/", getAllowedEmails);
allowedEmailsRouter.post("/addEmail", addAllowedEmail);
allowedEmailsRouter.delete("/deleteEmail/:id", deleteAllowedEmails);

export default allowedEmailsRouter;
