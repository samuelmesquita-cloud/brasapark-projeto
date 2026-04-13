const API = 'http://localhost:3000/atracoes';

function carregar() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';

      data.forEach(a => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
          <div class="card-info">
            <strong>${a.nome}</strong>
            <p>${a.descricao || ''}</p>
          </div>
          <button class="delete-btn" onclick="remover(${a.id})">Excluir</button>
        `;

        lista.appendChild(card);
      });
    });
}

function adicionar() {
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;

  if (!nome) {
    alert("Digite um nome!");
    return;
  }

  fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, descricao })
  })
  .then(() => {
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    carregar();
  });
}

function remover(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregar());
}

carregar();
