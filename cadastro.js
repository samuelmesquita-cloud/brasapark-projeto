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
