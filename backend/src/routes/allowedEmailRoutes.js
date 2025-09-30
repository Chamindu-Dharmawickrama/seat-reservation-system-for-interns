import { Router } from "express";
import {
    addAllowedEmail,
    deleteAllowedEmails,
    getAllowedEmails,
} from "../controllers/allowedEmailController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const allowedEmailsRouter = Router();

allowedEmailsRouter.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getAllowedEmails
);
allowedEmailsRouter.post(
    "/addEmail",
    authenticate,
    authorize("ADMIN"),
    addAllowedEmail
);
allowedEmailsRouter.delete(
    "/deleteEmail/:id",
    authenticate,
    authorize("ADMIN"),
    deleteAllowedEmails
);

export default allowedEmailsRouter;
