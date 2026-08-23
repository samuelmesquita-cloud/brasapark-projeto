import { api, saveSession } from "./api.js";

const form = document.getElementById("form-login");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.className = "message";

  try {
    const data = await api.login({
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
