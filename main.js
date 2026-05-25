// Arquivo principal de inicialização do frontend da aplicação.
// Ele verifica qual página está sendo carregada e executa as funções apropriadas:
// - Se existir a lista de atrações, chama a função para exibi-las.
// - Se existir um formulário, ativa o cadastro de clientes.
// Também inicializa o formulário de atrações, conectando os eventos necessários
// para cadastro e manipulação de dados no localStorage.

import { mostrarAtracoes } from "./atracoes.js";
import { mostrarClientes } from "./clientes.js";
import { formCliente, formAtracao } from "./forms.js";

if (document.getElementById("lista-atracoes")) {
  mostrarAtracoes();
}

if (document.getElementById("lista-clientes")) {
  mostrarClientes();
}

formCliente();
formAtracao();
