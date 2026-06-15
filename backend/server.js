// Configura e inicia o servidor da aplicação utilizando Node.js e Express.
// O código prepara a aplicação para receber requisições, organizar as rotas
// das atrações, permitir comunicação com outras aplicações e registrar logs
// das requisições no terminal. O servidor é iniciado na porta 3000.

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

// Servir os arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/atracoes", atracoesRoutes);
app.use("/clientes", clientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
