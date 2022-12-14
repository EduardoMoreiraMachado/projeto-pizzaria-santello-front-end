'use strict'

import { uploadImage } from "./firebase.js"
import { preview } from "./img.js"

const postServico = async (servico) => {
    const dadosServico = servico

    const url = 'http://localhost:1206/v1/servico'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosServico),
        headers: {
            'content-type': 'application/json',
        },
    };

    await fetch(url, options);
};

const salvarDados = async () => {
    const image = document.getElementById('img__input').files[0]
    const nameServico = document.getElementById('nome').value
    const nameFile = nameServico.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    const descricao = document.getElementById('descricao').value

    const servicoJSON = {
        nome: nameServico,
        descricao: descricao,
        foto: urlFoto
    };
    
    console.log(servicoJSON)
    await postServico(servicoJSON)
}

document.getElementById('habilitar_preview').addEventListener ('click', async () => {        

    const image = document.getElementById('img__input').files[0]
    const nameServico = document.getElementById('nome').value
    const nameFile = nameServico.replace(' ','-').toLowerCase()
    
    const urlFoto =  await uploadImage(image, nameFile)

    console.log(urlFoto)
    preview(urlFoto)

})

const salve = document.getElementById('enviar').addEventListener('click', salvarDados)

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})