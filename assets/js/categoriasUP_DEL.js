'use strict'

const editarCategoriaAPI = async (status, id) => {

    const url = `http://localhost:1206/v1/categoriaStatus/${status}/${id}`

    const option = {
        method: 'PUT'
    }

    await fetch(url, option)
}

const desativarCategoria = async function() {
    
    const radios = document.getElementsByClassName('option_tipo');
    
    let id

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            id = radios[i].value
        }
    }

    await editarCategoriaAPI(false, id)
}

const ativarCategoria = async function() {
    
    const radios = document.getElementsByClassName('option_tipo');
    
    let id

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            id = radios[i].value
            console.log(id)
        }
    }

    await editarCategoriaAPI(true, id)
}

const desativar = document.getElementById('desativar').addEventListener('click', desativarCategoria)

const ativar = document.getElementById('ativar').addEventListener('click', ativarCategoria)