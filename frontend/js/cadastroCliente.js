// Função responsável por configurar o formulário de cadastro de clientes.
// Captura os dados inseridos pelo usuário (nome, email e telefone),
// cria um objeto de cliente com ID único e data de cadastro,
// e armazena essas informações no localStorage do navegador.
// Também mantém os dados já existentes, adiciona o novo cliente,
// salva novamente e limpa o formulário após o envio.

// Configura o formulário de cadastro de clientes e envia para o backend.
// Em vez de usar localStorage, agora os dados são enviados via API (Express + SQLite).

import { api } from "./api.js";

async function loadSelect() {
  try {
    const select = document.getElementById("atracaoId");

    const atracoes = await api.getAtracoes();

    select.innerHTML = atracoes
      .map(a => `<option value="${a.id}">${a.nome}</option>`)
      .join("");
  } catch (error) {
    console.error("Erro ao carregar atrações", error);
  }
}

loadSelect();

document
  .getElementById("form-cliente")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        atracaoId: Number(document.getElementById("atracaoId").value)
      };

      await api.createCliente(data);

      alert("Compra realizada!");

      e.target.reset();
    } catch (error) {
      alert("Erro ao realizar compra");
      console.error(error);
    }
  });
