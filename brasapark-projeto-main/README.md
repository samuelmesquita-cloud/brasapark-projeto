# Brasa Park

Projeto full stack com Node.js, Express, TypeScript, Prisma, SQLite, autenticacao JWT, validacao Zod e envio de e-mail com Nodemailer.

## Requisitos implementados

- Cadastro de usuarios com senha salva em hash usando `bcryptjs`.
- Login com comparacao segura de senha.
- Token JWT com `Authorization: Bearer`.
- Middleware protegendo rotas privadas.
- Front-end com cadastro, login, usuario logado, logout e redirecionamento.
- Testes REST Client em `requests/requests.http` e `requests/auth-tests.http`.
- Schemas Zod para `body`, `params` e `query`, executados antes dos Controllers.
- Erros de validacao 400 com lista de campos e mensagens.
- E-mail de boas-vindas em HTML e texto, com previa Ethereal em desenvolvimento.
- Upload de avatar autenticado com Multer, limite de 2 MB e tipos JPEG, PNG e GIF.
- Um registro de imagem por usuario, com substituicao segura do arquivo anterior.
- Testes de unidade, rotas, front-end, E2E e cobertura minima obrigatoria.

## Como rodar no GitHub Codespaces

1. Crie um arquivo `.env` na raiz do projeto, copiando o conteudo de `.env.example`.

```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET="troque-este-segredo-em-producao"
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
MAIL_FROM="Brasa Park <nao-responda@brasapark.com>"
```

2. Rode os comandos:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

3. No Codespaces, abra a aba **Ports**, procure a porta `3000` e clique em **Open in Browser**.

## Usuario demo

Depois do seed:

- Email: `admin@brasapark.com`
- Senha: `123456`

## Paginas

- `/` lista as atracoes.
- `/register.html` cadastra usuario.
- `/login.html` faz login.
- `/cadastroAtracao.html` cadastra atracao apenas com usuario logado.
- `/cadastroCliente.html` cadastra compra/cliente apenas com usuario logado.
- `/profile.html` envia, atualiza e pre-visualiza o avatar do usuario autenticado.

## Banco

O banco SQLite fica em:

```text
prisma/dev.db
```

Use `npx prisma studio` ou uma extensao SQLite no Codespaces para visualizar as tabelas.

## Testes de autenticacao

Com o servidor rodando em `npm run dev`, abra um destes arquivos no VS Code:

```text
requests/requests.http
requests/auth-tests.http
```

Use a extensao **REST Client** e execute as requisicoes na ordem. Os testes mostram:

- cadastro de usuario;
- login valido;
- login com senha incorreta;
- rota publica sem token;
- rota protegida sem token retornando `401`;
- a mesma rota protegida funcionando com `Authorization: Bearer`;
- identificacao do usuario autenticado em `/auth/me`.

O token e capturado automaticamente do login com:

```http
@token = {{loginValido.response.body.$.token}}
```

E enviado depois assim:

```http
Authorization: Bearer {{token}}
```

## Testes de validacao e e-mail

Abra `requests/validation-email-tests.http` e execute os blocos na ordem. O arquivo demonstra:

- cadastro valido com e-mail de boas-vindas;
- corpo invalido retornando `400` e `issues`;
- parametro de rota e query invalidos;
- conflito de e-mail retornando `409`;
- recurso inexistente retornando `404`.

Sem `SMTP_HOST`, o Nodemailer cria automaticamente uma conta Ethereal de teste. Depois do cadastro, abra a URL de previa exibida no terminal. Para usar um SMTP real, preencha somente as variaveis `SMTP_*` no `.env`; esse arquivo nao deve ser enviado ao GitHub.

Fluxo de uma entrada invalida:

```text
Requisicao -> validate(schema) -> ZodError -> errorHandler -> HTTP 400 com issues
```

O e-mail so e chamado depois que o usuario foi salvo. Se o cadastro for recusado, o Controller nao chega ao envio. Se o SMTP falhar, o erro e registrado no terminal e o cadastro continua respondendo `201`.

## Upload de avatar

O avatar e enviado por `multipart/form-data` para `POST /api/users/image` ou `PUT /api/users/image`. As duas rotas exigem JWT antes de executar o Multer. O servidor aceita somente JPEG, PNG e GIF com ate 2 MB, gera o nome com UUID e salva o arquivo em `uploads/`.

O banco mantem um unico `UserImage` por usuario por meio de `usuarioId @unique`. Um reenvio atualiza esse registro e remove o arquivo anterior. Os arquivos enviados nao entram no Git; apenas `uploads/.gitkeep` preserva a pasta vazia.

Para demonstrar os cenarios com a extensao REST Client, execute na ordem:

```text
requests/upload-tests.http
```

O arquivo testa envio sem token, envio valido, abertura do caminho publico, limite de tamanho, tipo recusado e reenvio pelo mesmo usuario.

## Testes automatizados

A aplicacao Express e criada em `src/app.ts` e exportada sem abrir porta. `src/server.ts` apenas chama `listen`, permitindo que o Supertest exercite as rotas diretamente em memoria.

Instale as dependencias e o navegador do Playwright uma vez:

```bash
npm install
npm run e2e:install
```

Comandos disponiveis:

```bash
npm test            # unidade + rotas da API, sem abrir porta
npm run front:test  # api.js com fetch/localStorage simulados no JSDOM
npm run e2e         # fluxo completo em Chromium
npm run coverage    # cobertura separada do servidor e do front-end
```

Os testes rapidos ficam em `tests/server` e `tests/frontend` e devem ser executados durante o desenvolvimento. O fluxo em `tests/e2e` inicia um servidor na porta 3100, recria um banco `e2e.db`, abre um navegador real, faz login, cria uma atracao pela interface e confirma seu aparecimento na pagina inicial.

Durante os testes, `NODE_ENV=test` impede o envio de e-mail. Os bancos `prisma/test.db` e `prisma/e2e.db`, os relatorios e os artefatos do Playwright estao no `.gitignore`.

### Cobertura minima

`vitest.server.config.mjs` exige no servidor no minimo 55% de linhas e statements e 45% de funcoes e branches. `vitest.front.config.mjs` exige no modulo `frontend/js/api.js` 80% de linhas/statements, 75% de funcoes e 70% de branches. Se a cobertura cair abaixo desses pisos, `npm run coverage` termina com erro.

Os relatorios HTML sao gerados em:

```text
coverage/server/index.html
coverage/frontend/index.html
```
