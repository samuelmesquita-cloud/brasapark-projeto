import { api } from "./api.js";

async function loadAtracoes() {
  try {
    const lista = document.getElementById("lista-atracoes");

    const atracoes = await api.getAtracoes();

    if (!atracoes || atracoes.length === 0) {
      lista.innerHTML = "<p>Nenhuma atração encontrada.</p>";
      return;
    }

    lista.innerHTML = atracoes
      .map((a) => `
        <div class="col-md-4 mb-4">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">${a.nome}</h5>
              <p>${a.descricao || "Sem descrição"}</p>
              <p><strong>Tipo:</strong> ${a.tipo || "-"}</p>
              <p><strong>Status:</strong> ${a.status || "-"}</p>
            </div>
          </div>
        </div>
      `)
      .join("");

  } catch (error) {
    console.error("Erro ao carregar atrações:", error);

    const lista = document.getElementById("lista-atracoes");
    lista.innerHTML = "<p>Erro ao carregar dados.</p>";
  }
}

loadAtracoes();
