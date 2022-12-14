'use strict'

const getAllMensagens = async (id) => {

    const url = `http://localhost:1206/v1/contato/${id}`
    
    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}