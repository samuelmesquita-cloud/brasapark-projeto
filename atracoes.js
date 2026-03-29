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