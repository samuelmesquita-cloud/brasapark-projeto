import express from "express";
import cors from "cors";
import atracaoRoutes from "./routes/atracao.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/atracoes", atracaoRoutes);
app.use("/api/clientes", clienteRoutes);

export default app;
