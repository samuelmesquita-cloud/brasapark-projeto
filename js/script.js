const API = 'http://localhost:3000/atracoes';

function carregar() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';

      data.forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${a.nome} - ${a.descricao}
          <button onclick="remover(${a.id})">Excluir</button>
        `;
        lista.appendChild(li);
      });
    });
}

function adicionar() {
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;

  fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, descricao })
  })
  .then(() => carregar());
}

function remover(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregar());
}

carregar();
