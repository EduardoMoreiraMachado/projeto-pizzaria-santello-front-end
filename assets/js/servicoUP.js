'use strict'

const url = window.location.search.substring(1);
const id01 = url.split('=')[1]
console.log(id01)

import { uploadImage } from "../js/firebase.js"
import { preview } from "../js/img.js"

const updateServico = async (servico) => {
    const dadosServico = servico

    const url = 'http://192.168.1.204:1206/v1/servico'

    const options = {
        method: 'PUT',
        body: JSON.stringify(dadosServico),
        headers: {
            'content-type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        },
    };

    await fetch(url, options);

};

const excluirServico = async (id) => {

    const url = `http://192.168.1.204:1206/v1/servico/${id}`

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
    await updateServico(servicoJSON)
    
    window.location.href = `./ALLservicos.html`
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
    await excluirServico(id01)

    window.location.href = `./ALLservicos.html`
})

const previewIMG = document.getElementById('img_preview').addEventListener('click', () => {
    document.getElementById('habilitar_preview').style.display = 'flex'
    document.getElementById('habilitar_preview').style.gap = '15px'
})