import { mostrarAtracoes } from "./atracoes.js";
import { configurarCadastro } from "./cadastro.js";

// Detecta qual página está aberta
if (document.getElementById("lista-atracoes")) {
    mostrarAtracoes();
}

if (document.querySelector("form")) {
    configurarCadastro();
}
import { configurarFormularioAtracao } from "./atracoesForm.js";

configurarFormularioAtracao();
