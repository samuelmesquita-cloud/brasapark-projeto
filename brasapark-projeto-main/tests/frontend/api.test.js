import { beforeEach, describe, expect, it, vi } from "vitest";
import { api, getToken, getUser, isAuthenticated, requireAuth, saveSession } from "../../frontend/js/api.js";

function response(body, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    headers: { get: () => null },
    json: vi.fn().mockResolvedValue(body)
  };
}

beforeEach(() => {
  const values = new Map();
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => values.get(key) ?? null),
    setItem: vi.fn((key, value) => values.set(key, String(value))),
    removeItem: vi.fn((key) => values.delete(key)),
    clear: vi.fn(() => values.clear())
  });
  vi.stubGlobal("fetch", vi.fn());
});

describe("sessao local", () => {
  it("salva e recupera o token usando o mock de localStorage", () => {
    saveSession({ token: "jwt-teste", user: { id: 1, nome: "Ana" } });
    expect(getToken()).toBe("jwt-teste");
    expect(getUser()).toEqual({ id: 1, nome: "Ana" });
    expect(isAuthenticated()).toBe(true);
    expect(() => requireAuth()).not.toThrow();
    expect(localStorage.setItem).toHaveBeenCalledWith("brasapark_token", "jwt-teste");
  });

  it("representa uma sessao ausente", () => {
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});

describe("cliente da API", () => {
  it("envia login para a URL e metodo corretos", async () => {
    fetch.mockResolvedValue(response({ token: "jwt", user: { id: 1 } }));
    await api.login({ email: "ana@teste.com", senha: "123456" });

    expect(fetch).toHaveBeenCalledWith("/auth/login", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }));
  });

  it("inclui Authorization nas requisicoes autenticadas", async () => {
    saveSession({ token: "jwt-seguro", user: { id: 1 } });
    fetch.mockResolvedValue(response([]));
    await api.getClientes();

    expect(fetch).toHaveBeenCalledWith("/clientes", expect.objectContaining({
      headers: { Authorization: "Bearer jwt-seguro" }
    }));
  });

  it("envia FormData sem definir Content-Type manualmente", async () => {
    saveSession({ token: "jwt-upload", user: { id: 1 } });
    fetch.mockResolvedValue(response({ path: "/uploads/avatar.png" }, { status: 201 }));
    const file = new File(["imagem"], "avatar.png", { type: "image/png" });
    await api.uploadProfileImage(file);

    const [, options] = fetch.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.body.get("image")).toBe(file);
    expect(options.headers.Authorization).toBe("Bearer jwt-upload");
    expect(options.headers["Content-Type"]).toBeUndefined();
  });

  it("preserva status, campo e issues de uma resposta de erro", async () => {
    fetch.mockResolvedValue(response({
      error: "Dados invalidos",
      field: "email",
      issues: [{ path: "body.email", message: "Email invalido" }]
    }, { ok: false, status: 400 }));

    await expect(api.register({})).rejects.toMatchObject({
      message: "Dados invalidos",
      status: 400,
      field: "email",
      issues: [{ path: "body.email", message: "Email invalido" }]
    });
  });

  it("trata resposta 204 sem tentar ler JSON", async () => {
    const noContent = response(null, { status: 204 });
    fetch.mockResolvedValue(noContent);
    expect(await api.deleteAtracao(10)).toBeNull();
    expect(noContent.json).not.toHaveBeenCalled();
  });

  it("expoe os demais endpoints com URL e metodo esperados", async () => {
    fetch.mockResolvedValue(response({ ok: true }));

    await api.me();
    await api.getProfileImage();
    await api.getAtracoes();
    await api.createAtracao({ nome: "Roda" });
    await api.updateAtracao(7, { nome: "Roda Nova" });
    await api.createCliente({ nome: "Cliente" });

    expect(fetch.mock.calls.map(([url]) => url)).toEqual([
      "/auth/me",
      "/api/users/image",
      "/atracoes",
      "/atracoes",
      "/atracoes/7",
      "/clientes"
    ]);
    expect(fetch.mock.calls.map(([, options]) => options.method || "GET")).toEqual([
      "GET", "GET", "GET", "POST", "PUT", "POST"
    ]);
  });
});
