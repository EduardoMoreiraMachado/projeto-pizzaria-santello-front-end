'use strict'

import { uploadImage } from "./firebase.js"
import { createCategorias } from "./categoriasGET.js"

await createCategorias(1)

const postPizza = async (pizza) => {
    const dadosPizza = pizza

    const url = 'http://192.168.1.204:1206/v1/pizza'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosPizza),
        headers: {
            'content-type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
    };

    const response = await fetch(url, options);

    return response.status

};

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
    
    const urlFoto =  await uploadImage(image, nameFile)

    console.log(urlFoto)

    const precoPizza = document.getElementById('preco').value

    let desconto = document.getElementById('desconto').value

    if(desconto == '') {
        desconto = null
    }

    const radios = document.getElementsByName('categoria');
    
    let idCategoria

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            idCategoria = radios[i].value;
        }
    }

    const ingredientesPizza = document.getElementById('ingrediente').value


    const pizzaJSON = {
        nome: namePizza,
        preco: precoPizza,
        foto: urlFoto,
        id_categoria: idCategoria,
        desconto: desconto,
        ingredientes: ingredientesPizza
    };
    
    const post = await postPizza(pizzaJSON)
    
    // if (post.status != )
    window.location.reload(true)
}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const namePizza = document.getElementById('nome').value
    const nameFile = namePizza.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    preview(urlFoto)

})

const salve = document.getElementById('salvar').addEventListener('click', salvarDados)

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    const previewItem = document.getElementById('habilitar_preview').style.display = 'flex'
    previewItem.style.alignItems = 'center'
    previewItem.style.gap = '15px'
})
