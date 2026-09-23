import { Router } from "express";
import * as controller from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schemas/authSchemas";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(controller.register));
router.post("/login", validate(loginSchema), asyncHandler(controller.login));
router.get("/me", authMiddleware, asyncHandler(controller.me));

export default router;
