// Rotas responsáveis pelo gerenciamento de clientes.
// Este arquivo conecta as requisições HTTP às operações do modelo Cliente,
// permitindo CRUD completo (Create, Read, Update e Delete).

const express = require("express");
const router = express.Router();

const Cliente = require("../models/Cliente");

// LISTAR todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.read();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao listar clientes"
    });
  }
});

// CRIAR novo cliente
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.nome) {
      return res.status(400).json({
        erro: "O nome do cliente é obrigatório"
      });
    }

    const novoCliente = await Cliente.create(data);

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar cliente"
    });
  }
});

// ATUALIZAR cliente por ID
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    const clienteAtualizado = await Cliente.update(id, req.body);

    res.status(200).json(clienteAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao atualizar cliente"
    });
  }
});

// DELETAR cliente por ID
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    await Cliente.remove(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao deletar cliente"
    });
  }
});

module.exports = router;
