'use strict'

import { createAllCategorias} from "./categoriasGET.js"

await createAllCategorias()

const postCategoria = async (categoria) => {
    const dadosCategoria = categoria

    const url = 'http://192.168.1.7:1206/v1/categoria'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosCategoria),
        headers: {
            'content-type': 'application/json',
        },
    };

    await fetch(url, options);

};


const salvarCategoria = async function() {
    const nameCategoria = document.getElementById('input_insert').value
    const radios = document.getElementsByName('codigo_tipo');

    let tipo

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            tipo = radios[i].value;
        }
    }

    const categoriaJSON = {
        nome: nameCategoria,
        codigo_tipo: tipo,
    }
    
    console.log(categoriaJSON)
    await postCategoria(categoriaJSON)
    
    window.location.reload(true)
}

const salve = document.getElementById('salvar').addEventListener('click', salvarCategoria)