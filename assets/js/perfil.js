'use strict'

const link = window.location.search.substring(1);
const id01 = link.split('=')[1]
const idCliente = id01.split('?')[0]

const editarUsuario = async (usuario, id) => {
    let responseJSON = {}

    const url = `http://localhost:8080/v1/cliente/${id}`

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

const excluirUsuario = async (id) => {

    const url = `http://localhost:8080/v1/cliente/${id}`

    const response = await fetch(url)

    const deletar = await response.json()

    return deletar;
}

const editUser = async () => {

    const nameUser = document.getElementById('name').value
    const emailUser = document.getElementById('email').value
    const passUser = document.getElementById('password').value
    
    var editUserJSON = {
        nome: nameUser,
        email: emailUser,
        senha: passUser
    }
    
    const save = await editarUsuario(editUserJSON, idCliente)
    console.log(save)

    if (save.statusCode == 201) {
        alert('AAEEEEEEE!!!!! :))))))))')
    } else {
        alert('AAAAAAAAAAAAAAHHHHHH!!!! ;((((((((')
    }
}

const deleteUser = async () => {
    
    const excluir = await excluirUsuario(idCliente)

    if (excluir.statusCode == 200) {
        window.location.href = './welcome-page.html'
    } else {
        alert('AAAAAAAAAAAAAAHHHHHH!!!! ;((((((((')
    }
}

const buttonSave = document.getElementById('save').addEventListener('click', editUser)
const buttonDelete = document.getElementById('delete').addEventListener('click', deleteUser)