const express = require('express');
const router = express.Router();

let atracoes = [];

// GET
router.get('/', (req, res) => {
  res.json(atracoes);
});

// POST
router.post('/', (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  const nova = {
    id: Date.now(),
    nome,
    descricao
  };

  atracoes.push(nova);
  res.status(201).json(nova);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = atracoes.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  atracoes[index] = { ...atracoes[index], ...req.body };
  res.json(atracoes[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  atracoes = atracoes.filter(a => a.id !== id);

  res.status(204).send();
});

module.exports = router;
