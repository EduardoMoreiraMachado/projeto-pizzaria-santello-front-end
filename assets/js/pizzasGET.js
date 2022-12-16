'use strict'

const apiPizzas = async () => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = `http://192.168.1.204:1206/v1/todasPizzas`

    const options = {
        method: 'GET',
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    }

    const response = await fetch(urlTodasPizzasAPI, options)
    pizzasJSON.statusCode = response.status
    const listaTodasPizzas = await response.json()
    pizzasJSON.message = listaTodasPizzas

    console.log(pizzasJSON)
    return pizzasJSON
}

const apiPizza = async (id) => {
  
    const urlGetPizzaAPI = `http://192.168.1.204:1206/v1/pizza/${id}` 
 
    const options = { 
        method: 'GET', 
        headers: { 
            'x-access-token': window.localStorage.getItem('token') 
        } 
    } 
    
    const response = await fetch(urlGetPizzaAPI, options)

    return await response.json()

}

const createCardsPizzas = async (dataPizzas) => {
    const pizzasAPI = await dataPizzas
    // console.log(pizzasAPI.message[0])

    const pizzasContainer = document.getElementById('todas_pizzas_container')
    const cssPizza = pizzasContainer.style
    cssPizza.display = 'grid'
    cssPizza.gridTemplateColumns = 'auto auto auto auto'
    cssPizza.gap = '50px'

    pizzasAPI.message.forEach(element => {
        pizzasContainer.innerHTML += `
        <pizza-cardapio class="pizza_cardapio" id_produto="${element.id_produto}" id_pizza="${element.id_pizza}" id_categoria="${element.id_categoria}" nome_pizza="${element.nome_produto}" nome_categoria="${element.nome_categoria}" foto="${element.foto}" preco="${element.preco}" qntd_favoritos="${element.qntd_favorito}" ingredientes="${element.ingredientes}" ></pizza-cardapio>
        `
    });
}

const createCardPizza = async (id) => { 
    const idPizza = id
    const pizzaAPI = await apiPizza(idPizza)

    const pizzasContainer = document.getElementById('todas_pizzas_container') 
 
    pizzaAPI.forEach(element => { 
        pizzasContainer.innerHTML += ` 
        <pizza-cardapio class="pizza_cardapio" id_produto="${element.id_produto}" id_pizza="${element.id_pizza}" id_categoria="${element.id_categoria}" nome_pizza="${element.nome_produto}" nome_categoria="${element.nome_categoria}" foto="${element.foto}" preco="${element.preco}" qntd_favoritos="${element.qntd_favorito}" ingredientes="${element.ingredientes}" ></pizza-cardapio> 
        ` 
    }); 
}

const searchProdutos = async function () {
const inputData = docment.getElementById('search_params').value

    const cards = document.getElementsByClassName('pizza_cardapio')

    cards.forEach = (element => {
        const nomeProduto = element.nome_pizza
        
        if(inputData.includes(nomeProduto)) {
            // await createCardPizzas(element.id_pizza)

            // await apiPizza()
        }
    })
}

await createCardsPizzas(apiPizzas())

//classe HTMLElement
class card extends HTMLElement {
    //criação das variáveis que vão receber os atributos
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.id_produto = 'Undefined'
        this.id_pizza = 'Undefined'
        this.id_categoria = 'Undefined'
        this.nome_pizza = 'Undefined'
        this.nome_categoria = 'Undefined'
        this.foto = 'Undefined'
        this.preco = 'Undefined'
        this.ingredientes = 'Undefined'
    }

    //pega os atributos
    static get observedAttributes() {
        return ['id_produto', 'id_pizza', 'id_categoria', 'nome_pizza', 'nome_categoria', 'foto', 'preco', 'ingredientes'];
    }

    //iguala as variáveis aos atributos criados
    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue;
    }

    //junta o html (component) com o css (styles)
    connectedCallback() {
        this.shadow.appendChild(this.component());
        this.shadow.appendChild(this.styles());
    }

    //css
    styles() {
        const style = document.createElement('style');

        style.textContent = `
        .card-pizza {
            text-decoration: none;
            display: flex;
            align-items: end;
            font-family: 'Montserrat', sans-serif;        
            justify-content: center;
            width: 16vw;
            height: 30vh;
            color: transparent;
            text-transform: uppercase;
            font-weight: bolder;
            font-size: 1.5rem;
            background: url(${this.foto});
            background-repeat: no-repeat;
            background-size: cover;
            padding-bottom: 12px;
            border-radius: 30px;
        }
            
        .card-pizza:hover {
            box-shadow: inset 0px -60px 0px var(--color-medium);
            color: var(--bg-color);
        }            
        `
        return style;
    }
    //conteúdo que 
    component() {
        const card = document.createElement('a');
        card.classList.add('card-pizza');
        card.href = `./UPpizza.html?id_produto=${this.id_produto}?id_pizza=${this.id_pizza}`
        
        const imgPizza = document.createElement('div')
        imgPizza.classList.add('img__pizza')
        card.appendChild(imgPizza)

        const nome_ingrediente = document.createElement('div')
        nome_ingrediente.classList.add('nome-ingredientes__container')
        card.appendChild(nome_ingrediente)

        const nome = document.createElement('span')
        nome.classList.add('nome__pizza')
        nome.textContent = `${this.nome_pizza}`
        nome_ingrediente.appendChild(nome)
        
        //console.log(this.qntd_favoritos)

        return card;
    }
}

customElements.define('pizza-cardapio', card);

