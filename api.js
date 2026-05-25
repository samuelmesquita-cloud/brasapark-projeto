// Função assíncrona responsável por carregar as atrações a partir de um arquivo JSON local.
// O código faz uma requisição fetch para o arquivo "atracoes.json",
// converte a resposta para JSON e retorna os dados para serem usados na aplicação.

const BASE_URL = "http://localhost:3000";

export async function getAtracoes() {
  const res = await fetch(`${BASE_URL}/atracoes`);
  return res.json();
}

export async function createAtracao(data) {
  return fetch(`${BASE_URL}/atracoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteAtracao(id) {
  return fetch(`${BASE_URL}/atracoes/${id}`, {
    method: "DELETE"
  });
}

export async function getClientes() {
  const res = await fetch(`${BASE_URL}/clientes`);
  return res.json();
}

export async function createCliente(data) {
  return fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
