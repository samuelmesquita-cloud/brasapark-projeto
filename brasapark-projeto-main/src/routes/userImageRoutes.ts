import { Router } from "express";
import * as controller from "../controllers/userImageController";
import { uploadImage } from "../config/upload";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

router.get("/image", authMiddleware, asyncHandler(controller.get));
router.post("/image", authMiddleware, uploadImage.single("image"), asyncHandler(controller.upload));
router.put("/image", authMiddleware, uploadImage.single("image"), asyncHandler(controller.upload));

export default router;
