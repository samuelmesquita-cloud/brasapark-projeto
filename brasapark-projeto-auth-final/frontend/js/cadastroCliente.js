import { api, getUser, logout, requireAuth } from "./api.js";

requireAuth();

const message = document.getElementById("message");
const userArea = document.getElementById("user-area");
const user = getUser();

if (userArea) {
  userArea.innerHTML = `
    <span>Logado como ${user?.nome || "usuario"}</span>
    <button type="button" class="btn-secondary" id="logout">Sair</button>
  `;
  document.getElementById("logout").addEventListener("click", logout);
}

async function loadSelect() {
  try {
    const select = document.getElementById("atracaoId");
    const atracoes = await api.getAtracoes();

    select.innerHTML = atracoes
      .map((a) => `<option value="${a.id}">${a.nome}</option>`)
      .join("");
  } catch {
    message.textContent = "Erro ao carregar atracoes.";
    message.classList.add("error");
  }
}

document.getElementById("form-cliente").addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.className = "message";

  try {
    await api.createCliente({
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      atracaoId: Number(document.getElementById("atracaoId").value)
    });

    message.textContent = "Compra realizada com sucesso.";
    message.classList.add("success");
    event.target.reset();
    await loadSelect();
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  }
});

loadSelect();
