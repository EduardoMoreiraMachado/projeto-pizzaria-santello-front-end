'use strict'

const link = window.location.search.substring(1);
const id01 = link.split('=')[1]
const idCliente = id01.split('?')[0]

const editarUsuario = async (usuario, id) => {
    let responseJSON = {}

    const url = `http://192.168.1.7:1206/v1/cliente/${id}`

    const options = {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
        }
    }

    const response = await fetch(url, options)
    console.log(response)

    responseJSON.statusCode = response.status
    responseJSON.json = response.json()
    
    return responseJSON
}

const excluirUsuario = async (id) => {

    const url = `http://localhost:1206/v1/cliente/${id}`

    const option = {
        method: 'DELETE',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }
    const response = await fetch(url, option)

    const deletar = await response.status
    console.log(deletar)

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
    console.log(save + ' ' + idCliente)

    if (save.statusCode == 201) {
        alert('AAEEEEEEE!!!!! :))))))))')
    } else {
        alert('AAAAAAAAAAAAAAHHHHHH!!!! ;((((((((')
    }
}

const deleteUser = async () => {
    
    const excluir = await excluirUsuario(idCliente)
    console.log(excluir)

    if (excluir   == 200) {
        window.location.href = './adm.html'
    } else {
        alert('AAAAAAAAAAAAAAHHHHHH!!!! ;((((((((')
    }
}

const buttonSave = document.getElementById('save').addEventListener('click', editUser)
const buttonDelete = document.getElementById('delete').addEventListener('click', deleteUser)