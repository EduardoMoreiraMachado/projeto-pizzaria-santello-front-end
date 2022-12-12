'use strict'

const listarPizzasFavoritas = async () => {

    const url = 'http://10.107.144.19:4182/v1/pizzasFavoritas'

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens

}

const favoritePizzasList = async () => {

    const favoritesList = document.getElementById('favorites')

    const favorites = await listarPizzasFavoritas()

    favorites.forEach(element => {

        const cardFavorite = document.createElement('div')
        cardFavorite.classList.add('review__items')

        cardFavorite.innerHTML = `
            <img src="${element.foto}"/>
            <h1>${element.nome_produto}</h1>
            <p>${element.ingredientes}</p>
            <h1>${element.preco}</h1>
        `

        favoritesList.appendChild(cardFavorite)

    })

}

favoritePizzasList()

let rev = 0;
carousel(rev);

function previousReview() {

    rev = rev - 1;
    carousel(rev);

}

function nextReview() {

    rev = rev + 2;
    carousel(rev);

}

function carousel(review) {

    let reviews = document.getElementsByClassName("review__items");

    if (review >= reviews.length) {

        review = 0;
        rev = 0;

    }

    if (review < 0) {

        review = reviews.length - 1;
        rev = reviews.length - 1;

    }

    for (let i = 0; i < reviews.length; i++) {

        reviews[i].style.display = "none";

    }

    for (let i = 0; i < 3; i++) {

        reviews[review + i].style.display = "block";

    }
    
}

