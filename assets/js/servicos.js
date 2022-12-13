'use strict'

const listarServicos = async () => {

    const url = 'http://localhost:1206/v1/servicos'

    const response = await fetch(url)

    const servicos = await response.json()

    return servicos

}

const servicesList = async () => {

    const servicesList = document.getElementById('services')

    const service = await listarServicos()

    let servicos = service.servicos
        
    servicos.forEach(element => {

        const cardService = document.createElement('div')
        cardService.classList.add('service_card')

        cardService.innerHTML = `
            <div class="service_image_container">
                <img src="${element.foto}" class="service_image">
            </div>
            <div class="service_info">
                <span class="service_name">${element.nome}</span>
                <p class="service_description">${element.descricao}</p>
            </div>
        `

        servicesList.appendChild(cardService)

    })

}

servicesList()
