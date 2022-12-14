'use strict'

const getAllMensagens = async (id) => {

    const url = `http://192.168.1.7:1206/v1/contato/${id}`

    const options = {
        method: 'GET',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }
    
    const response = await fetch(url, options)

    const mensagens = await response.json()

    return mensagens

}