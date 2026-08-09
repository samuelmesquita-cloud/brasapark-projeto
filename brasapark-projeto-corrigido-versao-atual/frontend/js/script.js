// Consome a API de atrações e exibe os dados na interface do usuário.
// O código faz uma requisição GET para buscar as atrações no backend,
// cria dinamicamente cards HTML para cada atração e os exibe na página.
// Também permite excluir uma atração através de uma requisição DELETE,
// atualizando a lista automaticamente após a remoção.

const API = 'http://localhost:3000/atracoes';

async function carregar() {
  try {

    const response = await fetch(API);
    const data = await response.json();

    const lista = document.getElementById('lista-atracoes');

    lista.innerHTML = '';

    data.forEach(a => {

      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');

      card.innerHTML = `
        <div class="card bg-dark text-light h-100 shadow">

          <div class="card-body">
            <h5 class="card-title">${a.nome}</h5>

            <p class="card-text">
              ${a.descricao || 'Sem descrição'}
            </p>

            <p><strong>Tipo:</strong> ${a.tipo || 'Não informado'}</p>
            <p><strong>Status:</strong> ${a.status || 'Ativa'}</p>

            <button class="btn btn-danger"
              onclick="remover(${a.id})">
              Excluir
            </button>
          </div>

        </div>
      `;

      lista.appendChild(card);
    });

  } catch (error) {
    console.error(error);
  }
}

async function remover(id) {
  try {

    await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });

    carregar();

  } catch (error) {
    console.error(error);
  }
}

carregar();
