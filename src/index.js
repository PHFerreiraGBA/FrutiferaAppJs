import { preparacoesCard } from './dataset/preparacoes.js';

/*
  A função getCartao pega um dos cards presentes
  em PreparacoesCard (item) e reestrutura como um 
  HTML para um card do Bootstrap.
*/

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

/*
  Já a função setCartaoCol pega a resposta de getCartao
  e insere na div cartoes.
*/

let setCartaoCol = (cartao) => {
  let cartoesDiv = document.getElementById('cartoes');
  cartoesDiv.insertAdjacentHTML('beforeend', cartao);
};

/*
  Por último, a função createCartoes executa as funções
  getCartao e setCartaoCol para cada item de preparacoesCard.
*/

let createCartoes = () => {
  for (let item of preparacoesCard) {
    // Html completo referente a cada card com o conteúdo.
    let cartao = getCartao(item);

    // Inserir cartão dentro do código html na div com id cartoes.
    setCartaoCol(cartao);
  }
};

createCartoes(); // Função para criar cards executada.
