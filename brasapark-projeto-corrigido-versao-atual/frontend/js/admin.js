import { api } from "./api.js";

const form = document.getElementById("form");

async function load() {
  const lista = document.getElementById("lista");
  const data = await api.getAtracoes();

  lista.innerHTML = data.map((a) => `
    <div>
      ${a.nome}
      <button onclick="del(${a.id})">X</button>
      <button onclick="edit(${a.id})">Editar</button>
    </div>
  `).join("");
}

window.del = async (id) => {
  await api.deleteAtracao(id);
  load();
};

window.edit = async (id) => {
  const nome = prompt("Novo nome");
  if (!nome) return;

  await api.updateAtracao(id, { nome });
  load();
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  if (!nome) return;

  await api.createAtracao({ nome });
  form.reset();
  load();
});

load();
