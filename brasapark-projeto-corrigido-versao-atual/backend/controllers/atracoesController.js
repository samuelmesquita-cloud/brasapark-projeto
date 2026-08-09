// Controlador responsável pelas operações CRUD das atrações da aplicação.
// Recebe as requisições HTTP e chama o modelo para acessar o banco de dados.
// Inclui validações básicas e tratamento de erros para evitar falhas na API.
// Retorna respostas em JSON com status HTTP adequados para cada operação.

const Atracao = require("../models/Atracao");

// LISTAR (GET)
async function GET(req, res) {
  try {
    const atracoes = await Atracao.read();

    res.status(200).json(atracoes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao listar atrações"
    });
  }
}

// CRIAR (POST)
async function POST(req, res) {
  try {
    const data = req.body;

    // validação básica
    if (!data.nome) {
      return res.status(400).json({
        erro: "O nome da atração é obrigatório"
      });
    }

    const novaAtracao = await Atracao.create(data);

    res.status(201).json(novaAtracao);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao criar atração"
    });
  }
}

// ATUALIZAR (PUT)
async function PUT(req, res) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    const atracaoAtualizada = await Atracao.update(id, req.body);

    res.status(200).json(atracaoAtualizada);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao atualizar atração"
    });
  }
}

// DELETAR (DELETE)
async function DELETE(req, res) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    await Atracao.remove(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao deletar atração"
    });
  }
}

module.exports = {
  GET,
  POST,
  PUT,
  DELETE
};
};
