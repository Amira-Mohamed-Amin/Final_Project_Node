import express from "express";
import { register } from "../controllers/User.controller.js";
import { registerSchema } from "../validations/auth.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;