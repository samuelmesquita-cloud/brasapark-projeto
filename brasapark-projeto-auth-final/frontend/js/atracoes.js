import { api } from "./api.js";

export async function mostrarAtracoes() {
  try {
    const data = await api.getAtracoes();
    const lista = document.getElementById("lista-atracoes");

    if (!lista) return;

    lista.innerHTML = "";

    data.forEach((a) => {
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
    console.error("Erro ao listar atracoes:", err);
  }
}
