const API = "http://localhost:3000";

async function request(url, options) {
  const res = await fetch(API + url, options);

  if (!res.ok) throw new Error("Erro API");

  return res.json();
}

export const api = {
  getAtracoes: () => request("/atracoes"),

  createAtracao: (data) =>
    request("/atracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  createCliente: (data) =>
    request("/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
};
