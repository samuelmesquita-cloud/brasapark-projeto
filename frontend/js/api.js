// Como estamos no mesmo servidor (Codespace), a raiz é vazia.
const API_BASE = ""; 

async function request(url, options) {
  // Isso vai gerar exatamente "/atracoes" ou "/clientes"
  const res = await fetch(API_BASE + url, options); 

  if (!res.ok) throw new Error("Erro API");

  // Garante que não vai quebrar se a resposta do servidor for vazia
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return null;
  }

  return res.json();
}

export const api = {
  // Busca atrações em: /atracoes
  getAtracoes: () => request("/atracoes"),

  // Cria atração em: /atracoes
  createAtracao: (data) =>
    request("/atracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  // Cria cliente em: /clientes
  createCliente: (data) =>
    request("/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)

deleteAtracao: async (id) => {
  const response = await fetch(
    `http://localhost:3000/atracoes/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao excluir atração");
  }
},
    })
};
