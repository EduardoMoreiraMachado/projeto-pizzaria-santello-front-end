'use strict'

const apiPizzas = async() => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = 'http://localhost:1234/v1/pizzas'

    const response = await fetch(urlTodasPizzasAPI)
    pizzasJSON.statusCode = response.status
    const listaTodasPizzas = await response.json()
    pizzasJSON.message = listaTodasPizzas

    return pizzasJSON
}

const createCardsPizzas = async (dataPizzas) => {
    const pizzasAPI = dataPizzas

    const pizzasContainer = document.getElementById('pizzas_container')

    pizzasAPI.forEach(element => {
        pizzasContainer.innerHTML = `
        <pizza-cardapio class="pizza_cardapio" id_produto="${element.id_produto}" id_pizza="${element.id_pizza}">dsf</pizza-cardapio>
        `
        console.log(element.nome_produto)
    });
}

createCardsPizzas()

apiPizzas()