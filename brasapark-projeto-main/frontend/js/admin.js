import { api, getUser, logout, requireAuth } from "./api.js";

requireAuth();

const form = document.getElementById("form");
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

async function load() {
  const lista = document.getElementById("lista");
  const data = await api.getAtracoes();

  lista.innerHTML = data.map((a) => `
    <div class="admin-item">
      <strong>${a.nome}</strong>
      <span>${a.tipo} - ${a.status}</span>
      <button onclick="edit(${a.id})">Editar</button>
      <button onclick="del(${a.id})">Excluir</button>
    </div>
  `).join("");
}

window.del = async (id) => {
  try {
    await api.deleteAtracao(id);
    await load();
  } catch (error) {
    message.textContent = error.message;
    message.className = "message error";
  }
};

window.edit = async (id) => {
  const nome = prompt("Novo nome da atracao");
  if (!nome) return;

  try {
    await api.updateAtracao(id, { nome });
    await load();
  } catch (error) {
    message.textContent = error.message;
    message.className = "message error";
  }
};

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
      status: "Ativa"
    });

    message.textContent = "Atracao criada com sucesso.";
    message.classList.add("success");
    form.reset();
    await load();
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  }
});

load();
