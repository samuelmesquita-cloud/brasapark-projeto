import { api, saveSession } from "./api.js";

const form = document.getElementById("form-register");
const message = document.getElementById("message");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

function validatePasswordConfirmation() {
  confirmarSenha.setCustomValidity(
    confirmarSenha.value && confirmarSenha.value !== senha.value
      ? "As senhas precisam ser iguais."
      : ""
  );
}

senha.addEventListener("input", validatePasswordConfirmation);
confirmarSenha.addEventListener("input", validatePasswordConfirmation);

for (const input of form.elements) {
  if (input !== confirmarSenha) {
    input.addEventListener?.("input", () => input.setCustomValidity(""));
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validatePasswordConfirmation();
  if (!form.reportValidity()) return;
  message.textContent = "";
  message.className = "message";

  try {
    const data = await api.register({
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value
    });

    saveSession(data);
    window.location.href = "/";
  } catch (error) {
    const issue = error.issues?.[0];
    const fieldName = error.field || issue?.path?.split(".").pop();
    const field = fieldName ? form.elements.namedItem(fieldName) : null;

    if (field instanceof HTMLInputElement) {
      field.setCustomValidity(issue?.message || error.message);
      field.reportValidity();
    }

    message.textContent = error.message;
    message.classList.add("error");
  }
});
