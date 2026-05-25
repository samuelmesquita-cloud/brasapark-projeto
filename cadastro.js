// Função responsável por configurar o formulário de cadastro de clientes.
// Captura os dados inseridos pelo usuário (nome, email e telefone),
// cria um objeto de cliente com ID único e data de cadastro,
// e armazena essas informações no localStorage do navegador.
// Também mantém os dados já existentes, adiciona o novo cliente,
// salva novamente e limpa o formulário após o envio.

// Configura o formulário de cadastro de clientes e envia para o backend.
// Em vez de usar localStorage, agora os dados são enviados via API (Express + SQLite).

export function configurarCadastro() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const cliente = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value
        };

        try {
            const response = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }

            const data = await response.json();

            console.log("Cliente salvo no backend:", data);

            alert("Cadastro realizado com sucesso!");
            form.reset();

        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar cliente");
        }
    });
}
