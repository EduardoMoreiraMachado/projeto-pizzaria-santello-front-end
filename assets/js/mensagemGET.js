'use strict'
const url = window.location.search.substring(1);
console.log(url)
const id = url.split('=')[1]

const getMensagem = async (id) => {

    const url = `http://192.168.1.204:1206/v1/contato/${id}`

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

const deleteMensagem = async (id) => {

    const urlDel = `http://192.168.1.204:1206/v1/contato/${id}`

    const options = {
        method: 'DELETE',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }
    
    const response = await fetch(urlDel, options)

    const mensagens = await response.json()

    return mensagens

}

const viewMessage = async function() {
    const apiData = await getMensagem(id)

    const mensagemContainer = document.getElementById('message_container')

    const tipo = document.createElement('h1')
    tipo.classList.add('tipo__mensagem')
    tipo.textContent = apiData[0].nome_opcao

    const texto = document.createElement('span')
    texto.classList.add('mensagem')
    texto.textContent = apiData[0].mensagem

    const ContactData = document.createElement('div')
    ContactData.classList.add('dados__basicos')

    const nome = document.createElement('li')
    nome.classList.add('data')
    nome.textContent = apiData[0].nome_contato

    const email = document.createElement('li')
    email.classList.add('data')
    email.textContent = apiData[0].email

    const telefone = document.createElement('li')
    telefone.classList.add('data')

    if (apiData[0].telefone == "undefined") {
        telefone.textContent = 'Telefone não informado.'
    }

    else {
        telefone.textContent = apiData[0].telefone
    }
    
    const celular = document.createElement('li')
    celular.classList.add('data')
    celular.textContent = apiData[0].celular

    const buttonDel = document.createElement('button')
    buttonDel.classList.add('button__update')
    buttonDel.id = 'button_delete'
    buttonDel.textContent = 'excluir'

    ContactData.appendChild(nome)
    ContactData.appendChild(email)
    ContactData.appendChild(telefone)
    ContactData.appendChild(celular)

    mensagemContainer.appendChild(tipo)
    mensagemContainer.appendChild(texto)
    mensagemContainer.appendChild(ContactData)
    mensagemContainer.appendChild(buttonDel)

}

await viewMessage()

document.getElementById('button_delete').addEventListener('click', async () => {
    console.log(deleteMensagem(id))

    //window.location.href = `../mensagens.html`
})

console.log(id)