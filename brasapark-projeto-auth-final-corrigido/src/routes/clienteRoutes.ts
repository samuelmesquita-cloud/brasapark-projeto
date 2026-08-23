import { Router } from "express";
import * as controller from "../controllers/clienteController";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

router.get("/", authMiddleware, asyncHandler(controller.getAll));
router.post("/", authMiddleware, asyncHandler(controller.create));
router.put("/:id", authMiddleware, asyncHandler(controller.update));
router.delete("/:id", authMiddleware, asyncHandler(controller.remove));

export default router;
