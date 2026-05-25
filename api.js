// Função assíncrona responsável por carregar as atrações a partir de um arquivo JSON local.
// O código faz uma requisição fetch para o arquivo "atracoes.json",
// converte a resposta para JSON e retorna os dados para serem usados na aplicação.

export async function carregarAtracoes() {
    const resposta = await fetch("../data/atracoes.json");
    return await resposta.json();
}
