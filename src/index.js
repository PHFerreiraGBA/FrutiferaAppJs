import { preparacoesCard } from './dataset/preparacoes.js';

let getCartao = (item) => {
  return `<div class="col p-1">
          <div class="card">
            <img src="${item.src}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.titulo}</h5>
              <p class="card-text">${item.descricao}</p>
              <a href="./listaFrutiferas.html" class="btn btn-primary">${item.preco}</a>
            </div>
          </div>
        </div>`;
};

let setCartaoCol = (cartao) => {
  let cartoesDiv = document.getElementById('cartoes');
  cartoesDiv.insertAdjacentHTML('beforeend', cartao);
};

let createCartoes = () => {
  // Mini teste no retorno das férias. Eba!\o/
  for (let item of preparacoesCard) {
    // Html completo referente a cada card com o conteúdo.
    let cartao = getCartao(item);

    // Inserir cartão dentro do código html na div com id cartoes.
    setCartaoCol(cartao);
  }
};

createCartoes();
