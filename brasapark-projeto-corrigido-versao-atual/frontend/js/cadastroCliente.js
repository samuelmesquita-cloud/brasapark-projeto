import { api } from "./api.js";

async function loadSelect() {
  try {
    const select = document.getElementById("atracaoId");

    const atracoes = await api.getAtracoes();

    select.innerHTML = atracoes
      .map(a => `<option value="${a.id}">${a.nome}</option>`)
      .join("");
  } catch (error) {
    console.error("Erro ao carregar atrações", error);
  }
}

loadSelect();

document
  .getElementById("form-cliente")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        atracaoId: Number(document.getElementById("atracaoId").value)
      };

      await api.createCliente(data);

      alert("Compra realizada!");

      e.target.reset();
    } catch (error) {
      alert("Erro ao realizar compra");
      console.error(error);
    }
  });
