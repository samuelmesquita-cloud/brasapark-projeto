// Dados iniciais para testes.

const Database = require("./database");

async function seed() {
  const db = await Database.connect();

  await db.run(`
    INSERT INTO atracoes (nome, descricao, tipo, alturaMin, capacidade, status)
    VALUES 
    ('Roda Gigante', 'Vista panorâmica', 'Radical', 120, 40, 'Ativa');
  `);

  await db.run(`
    INSERT INTO clientes (nome, email, telefone, atracao_id)
    VALUES 
    ('Sarah', 'sarah@email.com', '99999-9999', 1),
    ('Carlos', 'carlos@email.com', '88888-8888', 1);
  `);

  console.log("Dados inseridos!");
}

seed();
