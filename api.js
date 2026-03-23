export async function carregarAtracoes() {
    const resposta = await fetch("../data/atracoes.json");
    return await resposta.json();
}