'use strict'

const listarPizzasDesconto = async () => {

    const url = 'http://192.168.1.112:1234/v1/pizzasDesconto'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}

const discountPizzasList = async () => {

    const discountList = document.getElementById('discount')

    const discount = await listarPizzasDesconto()

    discount.forEach(element => {

        const cardDiscount = document.createElement('div')
        cardDiscount.classList.add('discount_card')

        cardDiscount.innerHTML = `
            <div class="card_header">
                <img src="${element.foto}" class="discount_image">
                <span class="discount_name">${element.nome_produto}</span>
            </div>
            <p class="discount_ingredients">${element.ingredientes}</p>
            <span class="original_price">R$ ${element.preco}</span>
            <h1 class="discount_price">R$ ${element.preco_descontado}</h1>
        `

        discountList.appendChild(cardDiscount)

    })

}

discountPizzasList()
