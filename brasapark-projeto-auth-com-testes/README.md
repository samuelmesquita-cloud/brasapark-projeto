# Brasa Park

Projeto full stack com Node.js, Express, TypeScript, Prisma, SQLite e autenticacao JWT.

## Requisitos implementados

- Cadastro de usuarios com senha salva em hash usando `bcryptjs`.
- Login com comparacao segura de senha.
- Token JWT com `Authorization: Bearer`.
- Middleware protegendo rotas privadas.
- Front-end com cadastro, login, usuario logado, logout e redirecionamento.
- Testes REST Client em `requests/requests.http` e `requests/auth-tests.http`.

## Como rodar no GitHub Codespaces

1. Crie um arquivo `.env` na raiz do projeto, copiando o conteudo de `.env.example`.

```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET="troque-este-segredo-em-producao"
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
