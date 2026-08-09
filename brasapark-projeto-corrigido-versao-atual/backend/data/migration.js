// Cria a tabela de atrações no banco de dados SQLite da aplicação.
// O código realiza a conexão com o banco, define a estrutura da tabela
// atracoes com seus campos e tipos de dados, executa o comando SQL de
// criação utilizando migrations e exporta a função up para ser utilizada
// na inicialização e atualização do banco de dados.

    const Database = require("./database");
    
    async function up() {
      const db = await Database.connect();
    
      await db.exec(`
        CREATE TABLE IF NOT EXISTS atracoes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(100) NOT NULL,
          descricao TEXT,
          tipo VARCHAR(30),
          alturaMin INTEGER,
          capacidade INTEGER,
          status VARCHAR(20)
        );
      `);
    
      await db.exec(`
        CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(100) NOT NULL,
          email VARCHAR(100),
          telefone VARCHAR(20),
          atracao_id INTEGER,
          FOREIGN KEY (atracao_id) REFERENCES atracoes(id)
        );
      `);
    
      console.log("Tabelas criadas!");
    }
    
    module.exports = { up };
