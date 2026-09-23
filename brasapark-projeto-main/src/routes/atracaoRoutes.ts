import { Router } from "express";
import * as controller from "../controllers/atracaoController";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import { validate } from "../middleware/validate";
import { createAtracaoSchema, listAtracoesSchema, updateAtracaoSchema } from "../schemas/atracaoSchemas";
import { idParamsSchema } from "../schemas/commonSchemas";

const router = Router();

router.get("/", validate(listAtracoesSchema), asyncHandler(controller.getAll));
router.post("/", authMiddleware, validate(createAtracaoSchema), asyncHandler(controller.create));
router.put("/:id", authMiddleware, validate(updateAtracaoSchema), asyncHandler(controller.update));
router.delete("/:id", authMiddleware, validate(idParamsSchema), asyncHandler(controller.remove));

export default router;
