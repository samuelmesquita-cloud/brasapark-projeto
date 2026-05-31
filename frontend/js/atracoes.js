// Código responsável por carregar e exibir as atrações na interface do usuário.
// Ele busca os dados de um arquivo JSON (atracoes.json) usando fetch,
// cria dinamicamente cards HTML com informações das atrações e insere na página.
// Também trata erros caso a requisição falhe e exibe uma mensagem na tela.
// Além disso, executa automaticamente ao carregar a página (DOMContentLoaded)
// e contém uma função simples para simular a compra de ingresso.

const API = "http://localhost:3000/atracoes";


// =======================
// LISTAR ATRAÇÕES (GET)
// =======================
export async function mostrarAtracoes() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const lista = document.getElementById("lista-atracoes");
    lista.innerHTML = "";

    data.forEach(a => {
      const div = document.createElement("div");

      div.innerHTML = `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
          <h3>${a.nome}</h3>
          <p>${a.descricao || ""}</p>
          <p>Tipo: ${a.tipo}</p>
          <p>Status: ${a.status}</p>
        </div>
      `;

      lista.appendChild(div);
    });

  } catch (err) {
    console.error("Erro ao listar atrações:", err);
  }
}


