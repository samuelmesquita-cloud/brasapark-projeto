// Código responsável por carregar e exibir as atrações na interface do usuário.
// Ele busca os dados de um arquivo JSON (atracoes.json) usando fetch,
// cria dinamicamente cards HTML com informações das atrações e insere na página.
// Também trata erros caso a requisição falhe e exibe uma mensagem na tela.
// Além disso, executa automaticamente ao carregar a página (DOMContentLoaded)
// e contém uma função simples para simular a compra de ingresso.

import { getAtracoes, deleteAtracao } from "./api.js";

export async function mostrarAtracoes() {
  const lista = document.getElementById("lista-atracoes");

  const atracoes = await getAtracoes();

  lista.innerHTML = "";

  atracoes.forEach(a => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${a.nome}</h3>
      <p>${a.descricao}</p>
      <button onclick="remover(${a.id})">Excluir</button>
    `;

    lista.appendChild(div);
  });

  window.remover = async function (id) {
    await deleteAtracao(id);
    mostrarAtracoes();
  };
}
