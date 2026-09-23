// Função responsável por configurar o formulário de cadastro de atrações.
// Ela captura os dados digitados pelo usuário, valida os campos obrigatórios
// e cria um objeto de nova atração com ID único e data de cadastro.
// Em seguida, salva os dados no localStorage do navegador, permitindo
// armazenamento local sem banco de dados, e limpa o formulário após o envio.

// Configura o formulário de atrações e envia os dados para o backend.
// Substitui o uso de localStorage por requisição HTTP para a API.

// =======================
// CADASTRAR ATRAÇÃO (POST)
// =======================
export function configurarCadastroAtracao() {
  const form = document.getElementById("form-atracao");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const atracao = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      tipo: document.getElementById("tipo").value,
      alturaMin: Number(document.getElementById("altura").value),
      capacidade: Number(document.getElementById("capacidade").value),
      status: document.getElementById("status").value
    };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(atracao)
    });

    alert("Atração cadastrada!");
    form.reset();
  });
}
