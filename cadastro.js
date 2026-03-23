export function configurarCadastro() {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        if (!nome || !email) {
            alert("Preencha todos os campos!");
            return;
        }

        console.log("Usuário cadastrado:", { nome, email });

        alert("Cadastro realizado com sucesso!");

        form.reset();
    });
}