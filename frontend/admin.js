import { api } from "./api.js";


async function load() {
  const lista = document.getElementById("lista");

  const data = await api.getAtracoes();

  lista.innerHTML = data.map(a => `
    <div>
      ${a.nome}

      <button onclick="del(${a.id})">X</button>
      <button onclick="edit(${a.id})">Editar</button>
    </div>
  `).join("");
}

window.del = async (id) => {
  await fetch(`http://localhost:3000/atracoes/${id}`, {
    method: "DELETE"
  });

  load();
};

window.edit = async (id) => {
  const nome = prompt("Novo nome");

  await fetch(`http://localhost:3000/atracoes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });

  load();
};

load();
