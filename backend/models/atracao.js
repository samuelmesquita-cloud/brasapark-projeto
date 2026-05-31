// Implementa o modelo de dados das atrações da aplicação.
// O código realiza operações CRUD no banco de dados SQLite, permitindo
// cadastrar, listar, atualizar e remover atrações da tabela atracoes.
// As funções utilizam comandos SQL com placeholders para manipular os
// dados de forma assíncrona e organizada através da conexão com o banco.

const Database = require("../data/database");

async function create(dados) {
  const db = await Database.connect();

  const sql = `
    INSERT INTO atracoes
    (nome, descricao, tipo, alturaMin, capacidade, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await db.run(sql, [
    dados.nome,
    dados.descricao,
    dados.tipo,
    dados.alturaMin,
    dados.capacidade,
    dados.status
  ]);

  return {
    id: result.lastID,
    ...dados
  };
}

async function read() {
  const db = await Database.connect();

  const sql = `
    SELECT * FROM atracoes
  `;

  return await db.all(sql);
}

async function update(id, dados) {
  const db = await Database.connect();

  const sql = `
    UPDATE atracoes
    SET
      nome = ?,
      descricao = ?,
      tipo = ?,
      alturaMin = ?,
      capacidade = ?,
      status = ?
    WHERE id = ?
  `;

  await db.run(sql, [
    dados.nome,
    dados.descricao,
    dados.tipo,
    dados.alturaMin,
    dados.capacidade,
    dados.status,
    id
  ]);

  return { id, ...dados };
}

async function remove(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM atracoes
    WHERE id = ?
  `;

  await db.run(sql, [id]);

  return true;
}

module.exports = {
  create,
  read,
  update,
  remove
};
