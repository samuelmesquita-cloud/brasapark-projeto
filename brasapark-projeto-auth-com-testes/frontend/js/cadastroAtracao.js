import { api, getUser, logout, requireAuth } from "./api.js";

requireAuth();

const form = document.getElementById("form-atracao");
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.className = "message";

  try {
    await api.createAtracao({
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      tipo: document.getElementById("tipo").value,
      alturaMin: Number(document.getElementById("alturaMin").value),
      capacidade: Number(document.getElementById("capacidade").value),
      status: document.getElementById("status").value
    });

    message.textContent = "Atracao cadastrada com sucesso.";
    message.classList.add("success");
    form.reset();
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  }
});
