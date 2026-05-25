// Arquivo principal de inicialização do frontend da aplicação.
// Ele verifica qual página está sendo carregada e executa as funções apropriadas:
// - Se existir a lista de atrações, chama a função para exibi-las.
// - Se existir um formulário, ativa o cadastro de clientes.
// Também inicializa o formulário de atrações, conectando os eventos necessários
// para cadastro e manipulação de dados no localStorage.

import { mostrarAtracoes, configurarCadastroAtracao } from "./atracoes.js";
import { configurarCadastroCliente } from "./clientes.js";

document.addEventListener("DOMContentLoaded", () => {

  // LISTAGEM ATRAÇÕES
  if (document.getElementById("lista-atracoes")) {
    mostrarAtracoes();
  }

  // CADASTRO ATRAÇÕES
  if (document.getElementById("form-atracao")) {
    configurarCadastroAtracao();
  }

  // CADASTRO CLIENTES
  if (document.getElementById("form-cliente")) {
    configurarCadastroCliente();
  }

});
