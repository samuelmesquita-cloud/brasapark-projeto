import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import atracaoRoutes from "./routes/atracaoRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import userImageRoutes from "./routes/userImageRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  app.use(express.static(path.join(__dirname, "../frontend")));

  app.use("/auth", authRoutes);
  app.use("/atracoes", atracaoRoutes);
  app.use("/clientes", clienteRoutes);
  app.use("/api/users", userImageRoutes);

  app.use(errorHandler);
  return app;
}

export const app = createApp();
