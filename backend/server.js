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

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "frontend")));

app.use("/atracoes", atracoesRoutes);
app.use("/clientes", clientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
