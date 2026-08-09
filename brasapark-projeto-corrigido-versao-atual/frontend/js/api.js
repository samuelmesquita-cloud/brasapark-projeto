const API_BASE = "";

async function request(url, options) {
  const res = await fetch(API_BASE + url, options);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Erro API");
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return null;
  }

  return res.json();
}

export const api = {
  getAtracoes: () => request("/atracoes"),
  getClientes: () => request("/clientes"),

  createAtracao: (data) =>
    request("/atracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  updateAtracao: (id, data) =>
    request(`/atracoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  deleteAtracao: (id) =>
    request(`/atracoes/${id}`, {
      method: "DELETE"
    }),

  createCliente: (data) =>
    request("/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
};
