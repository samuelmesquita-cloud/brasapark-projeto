import { api } from "./api.js";

const form = document.getElementById("form-atracao");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const atracao = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    tipo: document.getElementById("tipo").value,
    alturaMin: Number(document.getElementById("alturaMin").value),
    capacidade: Number(document.getElementById("capacidade").value),
    status: document.getElementById("status").value
  };

  try {
    // Chamando a função correta que vem do objeto api
    await api.createAtracao(atracao); 
    
    alert("Atração cadastrada com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao cadastrar atração:", error);
    alert("Não foi possível cadastrar a atração.");
  }
});
