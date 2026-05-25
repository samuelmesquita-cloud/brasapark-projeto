// Função responsável por configurar o formulário de cadastro de clientes.
// Captura os dados inseridos pelo usuário (nome, email e telefone),
// cria um objeto de cliente com ID único e data de cadastro,
// e armazena essas informações no localStorage do navegador.
// Também mantém os dados já existentes, adiciona o novo cliente,
// salva novamente e limpa o formulário após o envio.

export function configurarCadastro() {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        const novoCliente = {
            id: Date.now(),
            nome,
            email,
            telefone,
            dataCadastro: new Date().toISOString()
        };

        // pega dados já salvos
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        // adiciona novo cliente
        clientes.push(novoCliente);

        // salva novamente
        localStorage.setItem("clientes", JSON.stringify(clientes));

        console.log("Cliente salvo:", novoCliente);

        alert("Cadastro realizado com sucesso!");
        form.reset();
    });
}
