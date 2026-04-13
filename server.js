const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const atracoesRoutes = require('./routes/atracoes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/atracoes', atracoesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
