import { describe, expect, it } from "vitest";
import { registerSchema } from "../../src/schemas/authSchemas";
import { createAtracaoSchema, listAtracoesSchema } from "../../src/schemas/atracaoSchemas";
import { getImageExtension, isImageSizeAllowed, MAX_IMAGE_SIZE } from "../../src/utils/image";
import { normalizeEmail, parseBearerToken, safeDecodeURIComponent } from "../../src/utils/text";

describe("schemas de validacao", () => {
  it("normaliza um cadastro valido", () => {
    const result = registerSchema.parse({
      body: { nome: "  Maria Silva  ", email: "  MARIA@EXEMPLO.COM ", senha: "123456" }
    });
    expect(result.body).toEqual({ nome: "Maria Silva", email: "maria@exemplo.com", senha: "123456" });
  });

  it.each([
    [{ nome: "", email: "maria@exemplo.com", senha: "123456" }, "nome vazio"],
    [{ nome: "Maria", email: "invalido", senha: "123456" }, "email invalido"],
    [{ nome: "Maria", email: "maria@exemplo.com", senha: "123" }, "senha curta"],
    [{ nome: "Maria", senha: "123456" }, "email ausente"]
  ])("recusa cadastro com %s (%s)", (body) => {
    expect(registerSchema.safeParse({ body }).success).toBe(false);
  });

  it("aceita capacidade positiva e recusa zero", () => {
    const valid = { body: { nome: "Roda Gigante", descricao: "", tipo: "Familiar", alturaMin: 0, capacidade: 1, status: "Ativa" } };
    expect(createAtracaoSchema.safeParse(valid).success).toBe(true);
    expect(createAtracaoSchema.safeParse({ body: { ...valid.body, capacidade: 0 } }).success).toBe(false);
  });

  it("valida query e seu limite de borda", () => {
    expect(listAtracoesSchema.safeParse({ query: { limit: "100", status: "Ativa" } }).success).toBe(true);
    expect(listAtracoesSchema.safeParse({ query: { limit: "101" } }).success).toBe(false);
  });
});

describe("funcoes puras", () => {
  it("normaliza email ausente, vazio e preenchido", () => {
    expect(normalizeEmail(undefined)).toBe("");
    expect(normalizeEmail("   ")).toBe("");
    expect(normalizeEmail(" Aluno@EXEMPLO.com ")).toBe("aluno@exemplo.com");
  });

  it("extrai apenas Bearer token valido", () => {
    expect(parseBearerToken(undefined)).toBeNull();
    expect(parseBearerToken("")).toBeNull();
    expect(parseBearerToken("Basic abc")).toBeNull();
    expect(parseBearerToken("Bearer   ")).toBeNull();
    expect(parseBearerToken("Bearer token-123")).toBe("token-123");
  });

  it("trata encoding valido e invalido sem lancar erro", () => {
    expect(safeDecodeURIComponent("Brasa%20Park")).toBe("Brasa Park");
    expect(safeDecodeURIComponent("%E0%A4%A")).toBeNull();
  });

  it("valida MIME e limites exatos da imagem", () => {
    expect(getImageExtension("image/png")).toBe(".png");
    expect(getImageExtension("application/pdf")).toBeNull();
    expect(getImageExtension(undefined)).toBeNull();
    expect(isImageSizeAllowed(1)).toBe(true);
    expect(isImageSizeAllowed(MAX_IMAGE_SIZE)).toBe(true);
    expect(isImageSizeAllowed(0)).toBe(false);
    expect(isImageSizeAllowed(MAX_IMAGE_SIZE + 1)).toBe(false);
  });
});
