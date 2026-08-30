const API_BASE = "";
const TOKEN_KEY = "brasapark_token";
const USER_KEY = "brasapark_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function saveSession(data) {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/login.html";
}

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "/login.html";
  }
}

async function request(url, options = {}) {
  const headers = {
    ...(options.headers || {})
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API_BASE + url, {
    ...options,
    headers
  });

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
  register: (data) =>
    request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  login: (data) =>
    request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  me: () => request("/auth/me"),

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
