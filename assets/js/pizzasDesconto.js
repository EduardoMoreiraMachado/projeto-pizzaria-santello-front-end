'use strict'

const listarPizzasDesconto = async () => {

    const url = 'http://localhost:1206/v1/pizzasDesconto'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}

const discountPizzasList = async () => {

    const discountList = document.getElementById('discount')

    const discount = await listarPizzasDesconto()

    let precoOriginal
    let precoDescontado
        
    discount.forEach(element => {

        const cardDiscount = document.createElement('div')
        cardDiscount.classList.add('discount_card')

        let preco = element.preco

        if (preco.split('.').length > 1) {
    
            if (preco.split('.')[1].length > 1) {
    
                precoOriginal = `R$ ${preco.split('.')}`
    
            } else {
    
                precoOriginal = `R$ ${preco.split('.')}0`
    
            }
    
        } else {
    
            precoOriginal = `R$ ${preco},00`
    
        }
    
        let precoDesconto = element.preco_descontado
        //console.log(precoDesconto)
    
        if (precoDesconto.split('.').length > 1) {
    
            if (precoDesconto.split('.')[1].length > 1) {
    
                precoDescontado = `R$ ${precoDesconto.split('.')}`
    
            } else {
    
                precoDescontado = `R$ ${precoDesconto.split('.')}0`
    
            }
    
        } else {
    
            precoDescontado = `R$ ${precoDesconto},00`
    
        }

        cardDiscount.innerHTML = `
            <div class="card_header">
                <img src="${element.foto}" class="discount_image">
                <span class="discount_name">${element.nome_produto}</span>
            </div>
            <p class="discount_ingredients">${element.ingredientes}</p>
            <span class="original_price">${precoOriginal}</span>
            <h1 class="discount_price">${precoDescontado}</h1>
        `

        discountList.appendChild(cardDiscount)

    })

}

discountPizzasList()
