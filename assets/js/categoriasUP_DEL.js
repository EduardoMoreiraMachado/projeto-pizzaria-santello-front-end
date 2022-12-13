'use strict'

const editarCategoriaAPI = async (categoria, id) => {

    const url = `http://192.168.1.7:1206/v1/servico/${id}`

    const options = {
        method: 'PUT',
        body: JSON.stringify(categoria),
        headers: {
            'content-type': 'application/json'
        }
    }

    await fetch(url, options)
}

const editarCategoria = async function() {
    const nameCategoria = document.getElementById('input_insert').value
    const radios = document.getElementsByClassName('option_tipo');
    let tipo
    let id

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            id = radios[i].value
            console.log(id)
            // if (radios[i].name == 'pizza') {
            //     tipo = 1
            // }
            // else if(radios[i].name == 'bebida') {
            //     tipo = 2
            // }
        }
        else {
            tipo = undefined
            id = undefined

            console.log(radios[i].name)
        }
    }

    const categoriaJSON = {
        nome: nameCategoria,
        codigo_tipo: tipo,
    }
    
    console.log(categoriaJSON)
    //await editarCategoriaAPI(categoriaJSON, id)
}

const editar = document.getElementById('editar').addEventListener('click', editarCategoria)