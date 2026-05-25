// Função responsável por configurar o formulário de cadastro de atrações.
// Ela captura os dados digitados pelo usuário, valida os campos obrigatórios
// e cria um objeto de nova atração com ID único e data de cadastro.
// Em seguida, salva os dados no localStorage do navegador, permitindo
// armazenamento local sem banco de dados, e limpa o formulário após o envio.

export function configurarFormularioAtracao() {
    const form = document.getElementById("form-atracao");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const tipo = document.getElementById("tipo").value;
        const altura = document.getElementById("altura").value;
        const capacidade = document.getElementById("capacidade").value;
        const status = document.getElementById("status").value;

        // Validação
        if (!nome || !descricao) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        const novaAtracao = {
            id: Date.now(),
            nome,
            descricao,
            tipo,
            alturaMin: Number(altura),
            capacidade: Number(capacidade),
            status,
            dataCadastro: new Date().toISOString()
        };

        // pega dados existentes
        const atracoes = JSON.parse(localStorage.getItem("atracoes")) || [];

        // adiciona nova
        atracoes.push(novaAtracao);

        // salva
        localStorage.setItem("atracoes", JSON.stringify(atracoes));

        console.log("Atração cadastrada:", novaAtracao);

        alert("Atração cadastrada com sucesso!");

        form.reset();
    });
}
