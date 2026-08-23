# Autenticacao no Brasa Park

## Usuario e seguranca

O modelo `Usuario` fica em `prisma/schema.prisma` e possui `id`, `nome`, `email`, `senhaHash`, `criadoEm` e `atualizadoEm`.

O campo `email` tem restricao `@unique`, impedindo cadastro duplicado. A senha nunca e salva em texto puro: no cadastro, `bcrypt.hash(senha, 10)` gera o hash salvo em `senhaHash`.

## Cadastro e login

As rotas ficam em `src/routes/authRoutes.ts`:

- `POST /auth/register`: cadastra usuario, valida nome/email/senha, bloqueia email duplicado e retorna token.
- `POST /auth/login`: procura usuario por email, compara a senha com `bcrypt.compare` e retorna token.
- `GET /auth/me`: identifica o usuario autenticado.

Os controllers ficam em `src/controllers/authController.ts` e a regra de negocio em `src/services/authService.ts`.

## Token e rotas protegidas

A aplicacao usa JWT. O token e assinado com `JWT_SECRET` definido no `.env` e enviado pelo front-end no header:

```http
Authorization: Bearer TOKEN
```

O middleware `src/middleware/authMiddleware.ts` valida o token e coloca os dados do usuario em `req.user`.

Rotas protegidas:

- `POST /atracoes`
- `PUT /atracoes/:id`
- `DELETE /atracoes/:id`
- `GET /clientes`
- `POST /clientes`
- `PUT /clientes/:id`
- `DELETE /clientes/:id`

Sem token, a API retorna `401`.

## Front-end

O front-end possui:

- `frontend/register.html`: cadastro de usuario.
- `frontend/login.html`: login.
- `frontend/index.html`: mostra usuario logado e botao de logout.
- `frontend/cadastroAtracao.html`: rota privada no front.
- `frontend/cadastroCliente.html`: rota privada no front.

O arquivo `frontend/js/api.js` salva o token no `localStorage`, envia o token nas requisicoes protegidas e faz logout removendo os dados da sessao.

## Testes REST Client

Use `requests/requests.http` no VS Code com a extensao REST Client para testar cadastro, login, erro de login, rota protegida sem token e rota protegida com token.

## Como rodar

Crie `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET="troque-este-segredo-em-producao"
```

Depois:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Usuario demo:

- Email: `admin@brasapark.com`
- Senha: `123456`
