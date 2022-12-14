'use strict'

import { uploadImage } from "./firebase.js"
import { createCategorias } from "./categoriasGET.js"
import { preview } from "./img.js"

await createCategorias(2)

const postBebida = async (bebida) => {
    const dadosBebida = bebida

    const url = 'http://10.107.144.19:1206/v1/bebida'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosBebida),
        headers: {
            'content-type': 'application/json',
        },
    };

    await fetch(url, options);
};

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
        peso_liquido: volume
    };
    
    await postBebida(bebidaJSON)
    window.location.reload(true)

}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const nameBebida = document.getElementById('nome').value
    const nameFile = nameBebida.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    console.log(urlFoto)
    preview(urlFoto)

})

const salve = document.getElementById('enviar').addEventListener('click', salvarDados)

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})