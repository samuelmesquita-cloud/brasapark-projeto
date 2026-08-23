import { api, getUser, isAuthenticated, logout } from "./api.js";

function renderAuthState() {
  const area = document.getElementById("auth-area");
  if (!area) return;

  if (!isAuthenticated()) {
    area.innerHTML = `
      <a class="nav-link-custom" href="./login.html">Login</a>
      <a class="nav-link-custom" href="./register.html">Cadastro</a>
    `;
    return;
  }

  const user = getUser();
  area.innerHTML = `
    <span class="nav-user">Ola, ${user?.nome || "usuario"}</span>
    <a class="nav-link-custom" href="./cadastroAtracao.html">Nova atracao</a>
    <a class="nav-link-custom" href="./cadastroCliente.html">Comprar</a>
    <button class="nav-button" id="logout">Sair</button>
  `;

  document.getElementById("logout").addEventListener("click", logout);
}

async function loadAtracoes() {
  try {
    const lista = document.getElementById("lista-atracoes");
    const atracoes = await api.getAtracoes();

    if (!atracoes || atracoes.length === 0) {
      lista.innerHTML = "<p>Nenhuma atracao encontrada.</p>";
      return;
    }

    lista.innerHTML = atracoes
      .map((a) => `
        <div class="col-md-4 mb-4">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">${a.nome}</h5>
              <p>${a.descricao || "Sem descricao"}</p>
              <p><strong>Tipo:</strong> ${a.tipo || "-"}</p>
              <p><strong>Altura minima:</strong> ${a.alturaMin} cm</p>
              <p><strong>Capacidade:</strong> ${a.capacidade} pessoas</p>
              <p><strong>Status:</strong> ${a.status || "-"}</p>
            </div>
          </div>
        </div>
      `)
      .join("");
  } catch (error) {
    console.error("Erro ao carregar atracoes:", error);
    document.getElementById("lista-atracoes").innerHTML = "<p>Erro ao carregar dados.</p>";
  }
}

renderAuthState();
loadAtracoes();
