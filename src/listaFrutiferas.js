let frutiferaForm = document.getElementById("frutiferaForm");

const addItemCardapioTable = (itemFrutifera) => {
    let itensFrutiferaTBody = document.getElementById('tabelaFrutas');
    const dataPlantio = new Date(itemFrutifera.dataPlantio);

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

    itensFrutiferaTBody.insertAdjacentHTML('beforeend', itemFrutiferaTr);
};

function loadTable(planta) {
    const container = document.getElementById("tabelaFrutas");
    const dataPlantio = new Date(planta.dataPlantio);

    moment.locale("pt-br")
    
    container.insertAdjacentHTML("afterbegin", `
        <div class="col p-1">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    ${planta.nomePopular}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nome Científico: ${planta.nomeCientifico}</li>
                    <li class="list-group-item">Produção Média: ${planta.producao} kg</li>
                    <li class="list-group-item">Data de Plantio: ${dataPlantio.toLocaleDateString("pt-BR", {timeZone: 'UTC'})}</li>
                    <li class="list-group-item">Plantado ${moment(dataPlantio).fromNow()}</li>
                </ul>
            </div>
        </div>
    `);
}

const setPreparacaoFormValues = (
    nomePopular = '', 
    nomeCientifico = '', 
    producao = '',
    dataPlantio = ''
) => {
    const nomePopularInput = document.querySelector('#nomePopular');
    const nomeCientificoInput = document.querySelector('#nomeCientifico');
    const producaoInput = document.querySelector('#producao');
    const dataPlantioInput = document.querySelector('#dataPlantio');

    nomePopularInput.value = nomePopular;
    nomeCientificoInput.value = nomeCientifico;
    producaoInput.value = producao;
    dataPlantioInput.value = dataPlantio;
};

function saveInLocalStorage() {
    let id = Date.now();
    let nomePopular = document.getElementById("nomePopular").value;
    let nomeCientifico = document.getElementById("nomeCientifico").value;
    let producao = document.getElementById("producao").value;
    let dataPlantio = document.getElementById("dataPlantio").value;

    let novaPlanta = {
        id,
        nomePopular,
        nomeCientifico,
        producao,
        dataPlantio
    };

    if (localStorage.getItem("dados") == null) {
        localStorage.setItem("dados", JSON.stringify([novaPlanta]));
    } else {
        let listaDados = JSON.parse(localStorage.getItem("dados"));
        listaDados.push(novaPlanta);
        localStorage.setItem("dados", JSON.stringify(listaDados));
    };
}

if (localStorage.getItem("dados") != null) {
    let listaDados = JSON.parse(localStorage.getItem("dados"));
    for (let planta of listaDados) {
        loadTable(planta);
    }
}

frutiferaForm.onsubmit = (event) => {
    event.preventDefault();

    let frutiferaFormData = new FormData(frutiferaForm);
    let itemFrutifera = Object.fromEntries(frutiferaFormData);

    saveInLocalStorage();

    // Adicionar na tabela.
    addItemCardapioTable(itemFrutifera);

    // Limpar os valores do formulário.
    frutiferaForm.reset();
    setPreparacaoFormValues();

    // Fechar o modal.
    $('#frutiferaModal').modal('hide');

    Toastify({
        text: 'Item do cardápio adicionado com sucesso!',
        duration: 3000, // Duration in milliseconds (3 seconds)
    }).showToast();
}