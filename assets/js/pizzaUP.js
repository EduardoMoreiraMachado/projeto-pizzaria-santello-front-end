'use strict'

const url = window.location.search.substring(1);
console.log(url)

let idProd = url.split('=')[1]
const idProduto = idProd.split('?')[0]
let idPi = url.split('=')[2]
const idPizza = idPi.split('?')[0]

import { uploadImage } from "../js/firebase.js"
import { createCategorias } from "../js/categoriasGET.js"
import { preview } from "../js/img.js"

await createCategorias(1)

const updatePizza = async (pizza, id) => {
    const dadosPizza = pizza

    const url = `http://192.168.1.204:1206/v1/pizza/${id}`

    const options = {
        method: 'PUT',
        body: JSON.stringify(dadosPizza),
        headers: {
            'content-type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
    };

    await fetch(url, options);

};

const excluirPizza = async (id) => {

    const url = `http://192.168.1.204:1206/v1/pizza/${id}`

    const option = {
        method: 'DELETE',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }
    const response = await fetch(url, option)

    const deletar = response.status
    console.log(deletar)

    return deletar;
}

const salvarDados = async () => {
    const image = document.getElementById('img__input').files[0]
    const namePizza = document.getElementById('nome').value
    const nameFile = namePizza.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    const precoPizza = document.getElementById('preco').value

    const radios = document.getElementsByName('categoria');
    
    let idCategoria

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            idCategoria = radios[i].value;
        }
    }

    let desconto = document.getElementById('desconto').value

    if(desconto == '') {
        desconto = null
    }

    const ingredientesPizza = document.getElementById('ingrediente').value

    const pizzaJSON = {
        nome: namePizza,
        preco: precoPizza,
        foto: urlFoto,
        id_categoria: idCategoria,
        id_produto: idProduto,
        desconto: desconto,
        ingredientes: ingredientesPizza
    };

    
    await updatePizza(pizzaJSON, idPizza)
    
    window.location.href = `./ALLpizzas.html`
}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const nameServico = document.getElementById('nome').value
    const nameFile = nameServico.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    console.log(urlFoto)
    preview(urlFoto)

})
const atualizar = document.getElementById('atualizar').addEventListener('click', salvarDados)

const excluir = document.getElementById('excluir').addEventListener('click', async() => {
    console.log(await excluirPizza(idPizza))

    window.location.href = `./ALLpizzas.html`
})

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})
