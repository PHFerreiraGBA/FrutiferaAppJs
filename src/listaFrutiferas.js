//  No HTML, a FrutiferaForm é a div onde estarão os cards de cada árvore cadastrada.
let frutiferaForm = document.getElementById("frutiferaForm");

/*
    A função addItemCardapioTable carrega as informações de cada árvore e formata
    em um card, cada uma com o seu. Antes, ela colocava as árvores numa
    tabela, mas, devido aos requisitos da aplicação, ela coloca-as em cards.
*/

const addItemCardapioTable = (itemFrutifera) => {
    let itensFrutiferaTBody = document.getElementById('tabelaFrutas'); // Local onde serão colocados os cards formatados
    const dataPlantio = new Date(itemFrutifera.dataPlantio); // Data de plantio convertida de string comum para data ISO

    /*
        Nesse código, a biblioteca MomentJS calcula quanto tempo se
        passou desde o plantio da frutífera. A função locale está 
        definindo a língua da conversão como português do Brasil.
    */
    moment.locale("pt-br")

    let itemFrutiferaTr = `
        <div class="col p-1">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    ${itemFrutifera.nomePopular}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nome Científico: ${itemFrutifera.nomeCientifico}</li>
                    <li class="list-group-item">Produção Média: ${itemFrutifera.producao} kg</li>
                    <li class="list-group-item">Data de Plantio: ${dataPlantio.toLocaleDateString("pt-BR", {timeZone: 'UTC'})}</li>
                    <li class="list-group-item">Plantado ${moment(dataPlantio).fromNow()}</li>
                </ul>
            </div>
        </div>
    `;

    // toLocaleDateString converte a data do padrão ISO para o padrão usado no Brasil (DD-MM-YYYY).
    // Na MomentJS, a função fromNow faz o cálculo de há quanto tempo foi o plantio.

    itensFrutiferaTBody.insertAdjacentHTML('beforeend', itemFrutiferaTr); // Inserindo card no HTML
};

// A função setPreparacaoFormValues limpa o form para a próxima vez que for aberto.

const setPreparacaoFormValues = (
    nomePopular = '', 
    nomeCientifico = '', 
    producao = '',
    dataPlantio = ''
) => {
    // Importando as entradas do form para o JS...
    const nomePopularInput = document.querySelector('#nomePopular');
    const nomeCientificoInput = document.querySelector('#nomeCientifico');
    const producaoInput = document.querySelector('#producao');
    const dataPlantioInput = document.querySelector('#dataPlantio');

    // ...e limpando-as uma por uma.
    nomePopularInput.value = nomePopular;
    nomeCientificoInput.value = nomeCientifico;
    producaoInput.value = producao;
    dataPlantioInput.value = dataPlantio;
};

// A função saveInLocalStorage salva as árvores no Local Storage como uma lista JSON.

function saveInLocalStorage() {
    let id = Date.now(); // ID é a data de hoje em ISO.
    let nomePopular = document.getElementById("nomePopular").value;
    let nomeCientifico = document.getElementById("nomeCientifico").value;
    let producao = document.getElementById("producao").value; // Em KG.
    let dataPlantio = document.getElementById("dataPlantio").value;

    let novaPlanta = {
        id,
        nomePopular,
        nomeCientifico,
        producao,
        dataPlantio
    }; // Objeto com os dados da planta.

    if (localStorage.getItem("dados") == null) { // Se não tiver nenhuma planta no Local Storage...
        localStorage.setItem("dados", JSON.stringify([novaPlanta])); // ...crie uma lista.
    } else { // Se já tiver...
        let listaDados = JSON.parse(localStorage.getItem("dados")); // ...pegue a lista existente...
        listaDados.push(novaPlanta); // ...adicione a nova planta...
        localStorage.setItem("dados", JSON.stringify(listaDados)); // ...e importe a nova lista de volta.
    };
}


if (localStorage.getItem("dados") != null) { // Se tiver planta no Local Storage...
    let listaDados = JSON.parse(localStorage.getItem("dados")); // ...pegue os dados...
    for (let planta of listaDados) { // ...e para cada planta...
        addItemCardapioTable(planta); // ...converta-a em card e adicione ao HTML.
    }
}

frutiferaForm.onsubmit = (event) => { // Ao clicar em enviar no form...
    // Previnir o navegador de fazer a ação padrão.
    event.preventDefault();

    let frutiferaFormData = new FormData(frutiferaForm); // Dados do formulário
    let itemFrutifera = Object.fromEntries(frutiferaFormData); // Dados convertidos em um objeto.
    
    // Salvar no Local Storage.
    saveInLocalStorage();

    // Adicionar na div de cards.
    addItemCardapioTable(itemFrutifera);

    // Limpar os valores do formulário.
    frutiferaForm.reset();
    setPreparacaoFormValues();

    // Fechar o modal.
    $('#frutiferaModal').modal('hide');

    // Exibir um toast de sucesso.
    Toastify({
        text: 'Item do cardápio adicionado com sucesso!',
        duration: 3000, // Duration in milliseconds (3 seconds)
    }).showToast();
}