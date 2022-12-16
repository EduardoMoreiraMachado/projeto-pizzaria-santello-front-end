'use strict'

const getAllMensagens = async () => {

    const url = 'http://192.168.1.204:1206/v1/contatos'
    
    const options = {
        method: 'GET',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }

    const response = await fetch(url, options)
    
    const messages = response.json()

    return messages

}

const getMensagensByOption = async (opcao) => {

    const url = `http://192.168.1.204:1206/v1/contatos/filtro/${opcao}`
    
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

const messagesList = async () => {

    const messages = document.getElementById('messages')
    const messagesAPI = await getAllMensagens()

    messages.textContent = ''
    messagesAPI.forEach(element => {
        let mensagem = element.mensagem

        const cardMessage = document.createElement('a')
        cardMessage.classList.add('card__message')
        cardMessage.href = `./second-pages/VIEWmensagem.html?id=${element.id_contato}`

        const opcao = document.createElement('h3')
        opcao.classList.add('opcao__mensagem')
        opcao.textContent = `${element.nome_opcao}`

        const message = document.createElement('span')
        message.classList.add('preview__mensagem')
        if (mensagem.length < 300)
            message.textContent = `${element.mensagem}`

        else {
            let mensagemCurta = mensagem.slice(0, 290)
            //let mensagemColada = mensagemCurta.replace(/mensagem[290]/g, mensagem[290])
            message.textContent = `${mensagemCurta} [...]`
        }

        cardMessage.appendChild(opcao)
        cardMessage.appendChild(message)

        messages.appendChild(cardMessage)
    });
} 

const listarMensagensFiltradas = async (filtro) => {

    const messages = document.getElementById('messages')
    const messagesAPI = await getMensagensByOption(filtro)
    
    messages.textContent = ''

    messagesAPI.forEach(element => {
        let mensagem = element.mensagem

        const cardMessage = document.createElement('a')
        cardMessage.classList.add('card__message')
        cardMessage.href = `./second-pages/VIEWmensagem.html?id=${element.id}`

        const opcao = document.createElement('h3')
        opcao.classList.add('opcao__mensagem')
        opcao.textContent = `${element.nome_opcao}`

        const message = document.createElement('span')
        message.classList.add('preview__mensagem')
        if (mensagem.length < 300)
            message.textContent = `${element.mensagem}`

        else {
            let mensagemCurta = mensagem.slice(0, 290)
            //let mensagemColada = mensagemCurta.replace(/mensagem[290]/g, mensagem[290])
            message.textContent = `${mensagemCurta} [...]`
        }

        cardMessage.appendChild(opcao)
        cardMessage.appendChild(message)

        messages.appendChild(cardMessage)
    });
}

const filtrarMensagens = async () => {
    let select = document.getElementById('selectCategorias').value

    switch (select) {
        case '0':
            await messagesList()
            break;
    
        case '1':
            await listarMensagensFiltradas(1)
            break;
    
        case '2':
            await listarMensagensFiltradas(2)
            break;

        default:
            await messagesList()
            break;
    }
}

messagesList()
document.getElementById('selectCategorias').addEventListener('change', filtrarMensagens)
