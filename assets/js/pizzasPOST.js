'use strict'

import { uploadImage } from "../js/firebase.js"

const postPizza = async (pizza) => {
    const dadosPizza = pizza

    const url = 'http://192.168.1.7:1206/v1/pizza'

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

    const url = 'http://192.168.1.7:1206/v1/categorias'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens
}

console.log(await listarCategorias())


const salvarDados = async () => {

    const image = document.getElementById('img__input').files[0]
    const namePizza = document.getElementById('nome').value
    console.log('namePizza')
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
    
    await postPizza(pizzaJSON)
}

const salve = document.getElementById('enviar').addEventListener('click', salvarDados)

const preview = async ()