'use strict'

import { uploadImage } from "./firebase.js"
import { createCategorias } from "./categoriasGET.js"

await createCategorias(1)

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

    await fetch(url, options);

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

    const precoPizza = document.getElementById('preco').value

    const desconto = document.getElementById('desconto').value

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

    console.log(pizzaJSON)
    
    await postPizza(pizzaJSON)
}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const namePizza = document.getElementById('nome').value
    const nameFile = namePizza.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    preview(urlFoto)

})

const salve = document.getElementById('enviar').addEventListener('click', salvarDados)

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})

export { createCategorias }