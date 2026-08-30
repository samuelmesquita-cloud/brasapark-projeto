// Conexão com o banco SQLite.

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function connect() {
  return open({
    filename: path.resolve(__dirname, "db.sqlite"),
    driver: sqlite3.Database
  });
}

module.exports = { connect };
