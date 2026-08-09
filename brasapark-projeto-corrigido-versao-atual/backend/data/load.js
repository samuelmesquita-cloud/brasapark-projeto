// Executa as migrações do banco de dados da aplicação.
// O código importa o módulo responsável pelas migrations,
// chama o método up() para criar ou atualizar tabelas e,
// em seguida, executa a função load() para aplicar as alterações no banco.

const Migration = require("./migration");

async function load() {
  await Migration.up();
}

load();
