import { api, getUser, logout, requireAuth } from "./api.js";

requireAuth();

const form = document.getElementById("form-image");
const input = document.getElementById("image");
const preview = document.getElementById("avatar-preview");
const placeholder = document.getElementById("avatar-placeholder");
const message = document.getElementById("message");
const userArea = document.getElementById("user-area");
let hasStoredImage = false;
let localPreviewUrl;

userArea.innerHTML = `
  <span>Logado como ${getUser()?.nome || "usuario"}</span>
  <button type="button" class="btn-secondary" id="logout">Sair</button>
`;
document.getElementById("logout").addEventListener("click", logout);

function showPreview(src) {
  preview.src = src;
  preview.hidden = false;
  placeholder.hidden = true;
}

async function loadStoredImage() {
  try {
    const data = await api.getProfileImage();
    if (data.image?.caminho) {
      hasStoredImage = true;
      showPreview(data.image.caminho);
    }
  } catch (error) {
    message.textContent = error.message;
    message.className = "message error";
  }
}

input.addEventListener("change", () => {
  const file = input.files?.[0];
  message.textContent = "";
  message.className = "message";
  if (!file) return;

  const allowed = ["image/jpeg", "image/png", "image/gif"];
  if (!allowed.includes(file.type)) {
    input.value = "";
    message.textContent = "Tipo nao permitido. Use JPEG, PNG ou GIF.";
    message.classList.add("error");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    input.value = "";
    message.textContent = "A imagem deve ter no maximo 2 MB.";
    message.classList.add("error");
    return;
  }

  if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
  localPreviewUrl = URL.createObjectURL(file);
  showPreview(localPreviewUrl);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = input.files?.[0];
  if (!file) return;

  message.textContent = "Enviando...";
  message.className = "message";

  try {
    const result = await api.uploadProfileImage(file, hasStoredImage ? "PUT" : "POST");
    hasStoredImage = true;
    showPreview(`${result.path}?v=${Date.now()}`);
    message.textContent = result.message;
    message.classList.add("success");
    input.value = "";
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  }
});

loadStoredImage();
