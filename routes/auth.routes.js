import express from "express";
import { register, login } from "../controllers/User.controller.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/profile", authenticate, (req, res) => {
  return res.status(200).json({
    message: "Authenticated successfully",
    user: req.user,
  });
});

export default router;