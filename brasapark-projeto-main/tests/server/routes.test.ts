import fs from "fs/promises";
import path from "path";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import prisma from "../../src/config/prisma";
import { UPLOAD_DIR } from "../../src/config/upload";

let sequence = 0;

async function resetDatabase() {
  const images = await prisma.userImage.findMany();
  await Promise.all(images.map((image) =>
    fs.unlink(path.join(UPLOAD_DIR, path.basename(image.caminho))).catch(() => undefined)
  ));
  await prisma.userImage.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.atracao.deleteMany();
  await prisma.usuario.deleteMany();
}

async function registerUser(prefix = "usuario") {
  sequence += 1;
  const email = `${prefix}-${sequence}@teste.local`;
  const response = await request(app).post("/auth/register").send({
    nome: `Usuario ${sequence}`,
    email,
    senha: "123456"
  });
  expect(response.status).toBe(201);
  return { email, token: response.body.token as string };
}

beforeEach(resetDatabase);
afterAll(async () => {
  await resetDatabase();
  await prisma.$disconnect();
});

describe("rotas de autenticacao", () => {
  it("cadastra, autentica e identifica o usuario", async () => {
    const user = await registerUser("login");
    const login = await request(app).post("/auth/login").send({ email: user.email, senha: "123456" });
    expect(login.status).toBe(200);
    expect(login.body.token).toEqual(expect.any(String));

    const me = await request(app).get("/auth/me").set("Authorization", `Bearer ${login.body.token}`);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe(user.email);
  });

  it("responde 400 para corpo invalido, 401 para senha errada e 409 para email repetido", async () => {
    expect((await request(app).post("/auth/register").send({ nome: "A", email: "ruim", senha: "1" })).status).toBe(400);
    const user = await registerUser("duplicado");
    expect((await request(app).post("/auth/login").send({ email: user.email, senha: "errada" })).status).toBe(401);
    expect((await request(app).post("/auth/register").send({ nome: "Outro Nome", email: user.email, senha: "123456" })).status).toBe(409);
  });
});

describe("CRUD de atracoes", () => {
  it("bloqueia escrita sem token", async () => {
    const response = await request(app).post("/atracoes").send({ nome: "Sem Token" });
    expect(response.status).toBe(401);
  });

  it("cria, consulta, atualiza e remove uma atracao", async () => {
    const { token } = await registerUser("crud");
    const auth = { Authorization: `Bearer ${token}` };
    const created = await request(app).post("/atracoes").set(auth).send({
      nome: "Torre Automatizada",
      descricao: "Criada no teste",
      tipo: "Radical",
      alturaMin: 120,
      capacidade: 20,
      status: "Ativa"
    });
    expect(created.status).toBe(201);

    const list = await request(app).get("/atracoes?status=Ativa&limit=10");
    expect(list.status).toBe(200);
    expect(list.body).toEqual(expect.arrayContaining([expect.objectContaining({ nome: "Torre Automatizada" })]));

    const updated = await request(app).put(`/atracoes/${created.body.id}`).set(auth).send({ nome: "Torre Atualizada" });
    expect(updated.status).toBe(200);
    expect(updated.body.nome).toBe("Torre Atualizada");

    expect((await request(app).delete(`/atracoes/${created.body.id}`).set(auth)).status).toBe(204);
    expect((await request(app).delete(`/atracoes/${created.body.id}`).set(auth)).status).toBe(404);
  });

  it("responde 400 para atracao invalida", async () => {
    const { token } = await registerUser("invalido");
    const response = await request(app).post("/atracoes").set("Authorization", `Bearer ${token}`).send({
      nome: "A", tipo: "X", alturaMin: -1, capacidade: 0, status: "Desconhecida"
    });
    expect(response.status).toBe(400);
    expect(response.body.issues.length).toBeGreaterThan(0);
  });
});

describe("autorizacao dos dados do usuario", () => {
  it("cada usuario consulta somente seu proprio registro de imagem", async () => {
    const first = await registerUser("primeiro");
    const second = await registerUser("segundo");
    const tinyPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");

    const uploaded = await request(app)
      .post("/api/users/image")
      .set("Authorization", `Bearer ${first.token}`)
      .attach("image", tinyPng, { filename: "avatar.png", contentType: "image/png" });
    expect(uploaded.status).toBe(201);

    const own = await request(app).get("/api/users/image").set("Authorization", `Bearer ${first.token}`);
    const other = await request(app).get("/api/users/image").set("Authorization", `Bearer ${second.token}`);
    expect(own.body.image.caminho).toBe(uploaded.body.path);
    expect(other.body.image).toBeNull();
  });
});
