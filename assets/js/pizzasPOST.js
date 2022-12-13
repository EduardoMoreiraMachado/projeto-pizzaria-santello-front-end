'use strict'

import { uploadImage } from "../js/firebase.js"

const postPizza = async (pizza) => {
    const dadosPizza = pizza

    const url = 'http://localhost:1206/v1/pizza'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosPizza),
        headers: {
            'content-type': 'application/json',
        },
    };

    let teste = await fetch(url, options);

    console.log(teste)
};

const listarCategorias = async () => {

    const url = 'http://localhost:1206/v1/categorias'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens.categorias
}

console.log(await listarCategorias())

const createCategorias = async function() {
    const categoriasAPI = await listarCategorias()
    const categoriasContainer = document.getElementById('options_container')

    categoriasAPI.forEach(element => {
        const optionsContainer = document.createElement('div')
        optionsContainer.classList.add('radio__container')

        const option = document.createElement('input')
        option.type = 'radio'
        option.name = 'categoria'
        
        const text = document.createElement('label')
        text.textContent = element.nome

        console.log(element.nome)
        optionsContainer.appendChild(option)
        optionsContainer.appendChild(text)

        categoriasContainer.appendChild(optionsContainer)
    });
        
    categoriasContainer.style.display = 'grid'
    categoriasContainer.style.gridTemplateColumns = 'auto auto auto auto auto'
    categoriasContainer.style.gap = '50px'
    categoriasContainer.style.backgroundColor = 'tomato'
    categoriasContainer.style.alignItems = 'start'

}

await createCategorias()

const preview = (urlPreview) => {
    const imgPreview = document.getElementById('img_preview')
    console.log(urlPreview)
    imgPreview.style.background = `url(${urlPreview})`
    imgPreview.style.backgroundSize = 'cover'

    const icone = document.getElementById('input__file')
    icone.style.display = 'none'
}

const salvarDados = async () => {
    const image = document.getElementById('img__input').files[0]
    const namePizza = document.getElementById('nome').value
    const nameFile = namePizza.replace(' ','-').toLowerCase()
    
    var urlFoto =  await uploadImage(image, nameFile)

    const precoPizza = document.getElementById('preco').value

    // const opcaoCategoria = document.getElementById('categoria').value
    const desconto = document.getElementById('desconto').value

    const ingredientesPizza = document.getElementById('ingrediente').value

    const pizzaJSON = {
        nome: namePizza,
        preco: precoPizza,
        foto: urlFoto,
        id_categoria: 1,
        desconto: desconto,
        ingredientes: ingredientesPizza
    };

    preview(urlFoto)
    
    await postPizza(pizzaJSON)
}

const salve = document.getElementById('enviar').addEventListener('click', salvarDados)

    var radios = document.getElementsByName('categoria');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            console.log("Escolheu: " + radios[i].value);
        }
    }