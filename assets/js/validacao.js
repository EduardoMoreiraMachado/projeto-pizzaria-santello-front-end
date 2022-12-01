'use strict'

const validarLogin = async (login) => {
    let responseJSON = {}

    const url = 'http://10.107.144.3:8080/v1/loginCliente'

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
    
    var loginJSON = {
        email: emailADM,
        senha: senhaADM
    }
    
    const validacao = await validarLogin(loginJSON)

    if (validacao.statusCode == 200) {
        window.location.href = 'welcome-page.html'
        console.log(validacao.statusCode)
    }

    else {
        console.log('aaaa')
    }
}

const button = document.getElementById('enter').addEventListener('click', openDashboard)