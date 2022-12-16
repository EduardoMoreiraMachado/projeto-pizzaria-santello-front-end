'use strict'

const url = window.location.search.substring(1);

let idProd = url.split('=')[1]
const idProduto = idProd.split('?')[0]
let idBi = url.split('=')[2]
const idBebida = idBi.split('?')[0]
console.log(idBebida + 'dsdf')

import { uploadImage } from "../js/firebase.js"
import { createCategorias } from "../js/categoriasGET.js"
import { preview } from "../js/img.js"

await createCategorias(2)

const updateBebida = async (bebida, id) => {
    const dadosBebida = bebida

    const url = `http://192.168.1.204:1206/v1/bebida/${id}`

    const options = {
        method: 'PUT',
        body: JSON.stringify(dadosBebida),
        headers: {
            'content-type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
    };

    await fetch(url, options);

};

const excluirBebida = async (id) => {

    const url = `http://192.168.1.204:1206/v1/bebida/${id}`

    const option = {
        method: 'DELETE',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        },
    }
    const response = await fetch(url, option)

    const deletar = response.status
    console.log(deletar)

    return deletar;
}

const salvarDados = async () => {
    const image = document.getElementById('img__input').files[0]
    const nameBebida = document.getElementById('nome').value
    const nameFile = nameBebida.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    const precoBebida = document.getElementById('preco').value

    const radios = document.getElementsByName('categoria');
    
    let idCategoria

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            idCategoria = radios[i].value;
        }
    }

    const volume = document.getElementById('volume').value

    const bebidaJSON = {
        nome: nameBebida,
        preco: precoBebida,
        foto: urlFoto,
        id_categoria: idCategoria,
        id_produto: idProduto,
        peso_liquido: volume
    };
    
    await updateBebida(bebidaJSON, idBebida)
    
    window.location.href = `./ALLbebidas.html`
}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const nameBebida = document.getElementById('nome').value
    const nameFile = nameBebida.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    console.log(urlFoto)
    preview(urlFoto)

})

const atualizar = document.getElementById('atualizar').addEventListener('click', salvarDados)

const excluir = document.getElementById('excluir').addEventListener('click', async() => {
    await excluirBebida(idBebida)

    window.location.href = `./ALLbebidas.html`
})

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})