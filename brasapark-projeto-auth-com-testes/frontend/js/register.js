import { api, saveSession } from "./api.js";

const form = document.getElementById("form-register");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
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
    message.textContent = error.message;
    message.classList.add("error");
  }
});
