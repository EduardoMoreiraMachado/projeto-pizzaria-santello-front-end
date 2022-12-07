'use strict'

const listarMensagens = async () => {

    const url = 'http://10.107.144.22:8080/v1/contatos'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}

const messagesList = async () => {

    const messages = document.getElementById('messages')

} 
