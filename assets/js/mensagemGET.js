'use strict'

const getAllMensagens = async (id) => {

    const url = `http://10.107.144.19:1206/v1/contato/${id}`
    
    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}