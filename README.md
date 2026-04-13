Rotas da API
Foram implementadas rotas REST:
GET → listar dados
POST → criar
PUT → atualizar
DELETE → remover
As rotas utilizam validação, parâmetros (req.params) e retornam status HTTP adequados.

Testes com REST Client
As rotas foram testadas com arquivos .http, permitindo validar a API diretamente no VSCode.

Integração Front-end
O front-end utiliza fetch para consumir a API, exibindo e manipulando os dados dinamicamente.
