import { Router } from "express";
import * as controller from "../controllers/clienteController";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import { validate } from "../middleware/validate";
import { createClienteSchema, updateClienteSchema } from "../schemas/clienteSchemas";
import { idParamsSchema } from "../schemas/commonSchemas";

const router = Router();

router.get("/", authMiddleware, asyncHandler(controller.getAll));
router.post("/", authMiddleware, validate(createClienteSchema), asyncHandler(controller.create));
router.put("/:id", authMiddleware, validate(updateClienteSchema), asyncHandler(controller.update));
router.delete("/:id", authMiddleware, validate(idParamsSchema), asyncHandler(controller.remove));

export default router;
