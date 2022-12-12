'use strict'

const postPizza = async (pizza) => {
    const dadosPizza = pizza

    const url = 'http://localhost:4182/v1/pizza'

    const options = {
        method: 'POST',
        body: JSON.stringify(dadosPizza),
        headers: {
            'content-type': 'application/json',
        },
    };

    await fetch(url, options);
};