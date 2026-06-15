// Função responsável por configurar o formulário de cadastro de clientes.
// Captura os dados inseridos pelo usuário (nome, email e telefone),
// cria um objeto de cliente com ID único e data de cadastro,
// e armazena essas informações no localStorage do navegador.
// Também mantém os dados já existentes, adiciona o novo cliente,
// salva novamente e limpa o formulário após o envio.

// Configura o formulário de cadastro de clientes e envia para o backend.
// Em vez de usar localStorage, agora os dados são enviados via API (Express + SQLite).


const API = "http://localhost:3000/clientes";

export function configurarCadastroCliente() {
  const form = document.getElementById("form-cliente");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente = {
      nome: document.getElementById("nome_cliente").value,
      email: document.getElementById("email_cliente").value,
      telefone: document.getElementById("telefone_cliente").value
    };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });

    alert("Cliente cadastrado!");
    form.reset();
  });
}
