import { api } from "./api.js";

// Instancia global do Modal do Bootstrap para podermos abrir/fechar via JS
let modalBootstrap;
document.addEventListener("DOMContentLoaded", () => {
  modalBootstrap = new bootstrap.Modal(document.getElementById('editModal'));
});

// 1. CARREGAR E LISTAR ATRAÇÕES
async function load() {
  const lista = document.getElementById("lista");
  
  try {
    const data = await api.getAtracoes();

    if (data.length === 0) {
      lista.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Nenhuma atração cadastrada.</td></tr>`;
      return;
    }

    lista.innerHTML = data.map(a => {
      // Definindo cores das badges baseado no status atual da atração
      let statusBadge = 'bg-secondary';
      if (a.status === 'Ativa') statusBadge = 'bg-success';
      if (a.status === 'Manutenção') statusBadge = 'bg-warning text-dark';

      return `
        <tr>
          <td><strong class="text-dark">${a.nome}</strong></td>
          <td class="text-muted text-truncate" style="max-width: 200px;">${a.descricao || '-'}</td>
          <td><span class="badge bg-light text-dark border">${a.tipo || '-'}</span></td>
          <td>${a.alturaMin ? a.alturaMin + ' m' : '-'}</td>
          <td>${a.capacidade ? a.capacidade + ' pessoas' : '-'}</td>
          <td><span class="badge ${statusBadge}">${a.status || 'Inativa'}</span></td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary me-1" onclick="edit(${a.id})">Editar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="del(${a.id})">Excluir</button>
          </td>
        </tr>
      `;
    }).join("");
  } catch (error) {
    console.error("Erro ao carregar atrações:", error);
    lista.innerHTML = `<tr><td colspan="7" class="text-center text-danger py-4">Erro ao conectar com o servidor.</td></tr>`;
  }
}

// 2. EXCLUIR ATRAÇÃO
window.del = async (id) => {
  if (confirm("Deseja realmente excluir permanentemente esta atração?")) {
    try {
      await fetch(`http://localhost:3000/atracoes/${id}`, {
        method: "DELETE"
      });
      load(); // Recarrega a tabela atualizada
    } catch (error) {
      alert("Não foi possível deletar a atração.");
    }
  }
};

// 3. ABRIR E PREENCHER MODAL DE EDIÇÃO
window.edit = async (id) => {
  try {
    // Busca os dados da atração específica no backend
    const response = await fetch(`http://localhost:3000/atracoes/${id}`);
    const atracao = await response.json();

    // Popula os inputs do Modal com as informações atuais do banco
    document.getElementById("edit-id").value = atracao.id;
    document.getElementById("edit-nome").value = atracao.nome;
    document.getElementById("edit-descricao").value = atracao.descricao || "";
    document.getElementById("edit-tipo").value = atracao.tipo || "";
    document.getElementById("edit-alturaMin").value = atracao.alturaMin || "";
    document.getElementById("edit-capacidade").value = atracao.capacidade || "";
    document.getElementById("edit-status").value = atracao.status || "Ativa";

    // Mostra o Modal na tela
    modalBootstrap.show();
  } catch (error) {
    alert("Erro ao buscar detalhes da atração.");
  }
};

// 4. ENVIAR ATUALIZAÇÃO (PUT)
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede o recarregamento da página

  const id = document.getElementById("edit-id").value;
  
  // Monta o objeto completo estruturado exatamente como seu cadastro original espera
  const dadosAtualizados = {
    nome: document.getElementById("edit-nome").value,
    descricao: document.getElementById("edit-descricao").value,
    tipo: document.getElementById("edit-tipo").value,
    alturaMin: document.getElementById("edit-alturaMin").value ? Number(document.getElementById("edit-alturaMin").value) : null,
    capacidade: document.getElementById("edit-capacidade").value ? Number(document.getElementById("edit-capacidade").value) : null,
    status: document.getElementById("edit-status").value,
  };

  try {
    await fetch(`http://localhost:3000/atracoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAtualizados)
    });

    modalBootstrap.hide(); // Fecha o modal
    load(); // Recarrega a lista atualizada em tempo real
  } catch (error) {
    alert("Erro ao salvar as modificações da atração.");
  }
});

// Inicializa a listagem logo ao abrir a página
load();
