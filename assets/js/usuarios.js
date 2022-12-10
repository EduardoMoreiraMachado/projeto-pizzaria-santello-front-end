'use strict'

const inserirUsuario = async (usuario) => {
    let responseJSON = {}

    const url = 'http://localhost:1234/v1/cliente'

    const options = {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)

    responseJSON.statusCode = response.status
    responseJSON.json = response.json()
    
    return responseJSON
}

const saveUser = async () => {

    const nameUser = document.getElementById('name').value
    const emailUser = document.getElementById('email').value
    const passUser = document.getElementById('password').value
    
    var saveUserJSON = {
        nome: nameUser,
        email: emailUser,
        senha: passUser
    }
    
    const save = await inserirUsuario(saveUserJSON)
    console.log(save)

    if (save.statusCode == 201) {
        alert('AAEEEEEEE!!!!! :))))))))')
    } else {
        alert('AAAAAAAAAAAAAAHHHHHH!!!! ;((((((((')
    }
}

const button = document.getElementById('save').addEventListener('click', saveUser)