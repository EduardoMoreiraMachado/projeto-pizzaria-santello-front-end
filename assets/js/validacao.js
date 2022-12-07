'use strict'

async function validarLogin(login) {
    let responseJSON = {}

    const url = 'http://10.107.144.22:8080/v1/loginCliente'

    const options = {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)

    responseJSON.statusCode = response.status
    responseJSON.json = response.json()

    return responseJSON
}

const openDashboard = async () => {

    const emailADM = document.getElementById('email').value
    const senhaADM = document.getElementById('senha').value
    const h1 = document.getElementById('teste')
    
    var loginJSON = {
        email: emailADM,
        senha: senhaADM
    }
    
    const validacao = await validarLogin(loginJSON)
    var dadosADM = await validacao.json

    if (validacao.statusCode == 200) {
        window.location.href = `./welcome-page.html?id_adm=${dadosADM[0].id}?nome=${dadosADM[0].nome}`
    }

    else {
        alert('email ou senha incorreto(s)')
    }
}

const getName = async () => {return dadosADM[0].nome}

const button = document.getElementById('enter').addEventListener('click', openDashboard)

export {
    getName
}