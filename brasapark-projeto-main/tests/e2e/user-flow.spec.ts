import { expect, test } from "@playwright/test";

test("usuario faz login, cria uma atracao e a encontra na pagina inicial", async ({ page }) => {
  const attractionName = `Atracao E2E ${Date.now()}`;

  await page.goto("/login.html");
  await page.getByLabel("Email").fill("admin@brasapark.com");
  await page.getByLabel("Senha").fill("123456");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page.getByText("Ola, Sarah Admin")).toBeVisible();
  await page.getByRole("link", { name: "Nova atracao" }).click();

  await page.getByLabel("Nome").fill(attractionName);
  await page.getByLabel("Descricao").fill("Criada pelo Playwright");
  await page.getByLabel("Tipo").fill("Familiar");
  await page.getByLabel("Altura minima").fill("100");
  await page.getByLabel("Capacidade").fill("20");
  await page.getByLabel("Status").selectOption("Ativa");
  await page.getByRole("button", { name: "Cadastrar" }).click();

  await expect(page.getByText("Atracao cadastrada com sucesso.")).toBeVisible();
  await page.getByRole("link", { name: "Voltar para o inicio" }).click();
  await expect(page.getByRole("heading", { name: attractionName })).toBeVisible();
});
