// CRUD de clientes com relacionamento com atrações.

const Database = require("../data/database");

async function create(dados) {
  const db = await Database.connect();

  const sql = `
    INSERT INTO clientes (nome, email, telefone, atracao_id)
    VALUES (?, ?, ?, ?)
  `;

  const result = await db.run(sql, [
    dados.nome,
    dados.email,
    dados.telefone,
    dados.atracao_id
  ]);

  return { id: result.lastID, ...dados };
}

async function read() {
  const db = await Database.connect();

  return db.all(`
    SELECT clientes.id, clientes.nome, clientes.email, clientes.telefone,
           atracoes.nome AS atracao
    FROM clientes
    LEFT JOIN atracoes ON clientes.atracao_id = atracoes.id
  `);
}

module.exports = { create, read };
