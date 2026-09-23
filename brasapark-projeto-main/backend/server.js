const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const atracoesRoutes = require("./routes/atracoes");
const clientesRoutes = require("./routes/clientes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 1. Rotas da API primeiro
app.use("/atracoes", atracoesRoutes);
app.use("/clientes", clientesRoutes);

// 2. Servir os arquivos do frontend por último (Fallback)
app.use(express.static(path.join(__dirname, "../frontend")));

// Caso o usuário recarregue uma página interna (ex: /cadastro), serve o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
console.log(
  path.join(__dirname, "../../frontend")
);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
