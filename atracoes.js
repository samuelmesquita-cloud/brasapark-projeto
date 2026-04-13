import { carregarAtracoes } from "./api.js";

export async function mostrarAtracoes() {
    const lista = document.getElementById("lista-atracoes");
    const atracoes = await carregarAtracoes();

    lista.innerHTML = "";

    atracoes.forEach(a => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${a.nome}</h3>
            <p>${a.descricao}</p>
            <p><strong>Tipo:</strong> ${a.tipo}</p>
            <p><strong>Altura mínima:</strong> ${a.alturaMin} cm</p>
        `;

        lista.appendChild(div);
    });
}
async function carregarAtracoes() {
  try {
    const resposta = await fetch("js/atracoes.json");
    const atracoes = await resposta.json();

    const container = document.getElementById("lista-atracoes");

    container.innerHTML = "";

    atracoes.forEach(atracao => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <div class="card shadow h-100">
          <div class="card-body text-center">
            <h5 class="card-title">${atracao.nome}</h5>
            <p>${atracao.descricao}</p>
            <span class="badge bg-dark">${atracao.tipo}</span>
            <p class="mt-2"><strong>${atracao.alturaMin} cm</strong></p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar atrações:", erro);

    document.getElementById("lista-atracoes").innerHTML = `
      <p class="text-center text-danger">Erro ao carregar atrações </p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", carregarAtracoes);

function comprarIngresso() {
  alert("🎟️ Redirecionando para compra de ingressos...");
}
