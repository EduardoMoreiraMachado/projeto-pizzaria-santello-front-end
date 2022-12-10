'use strict'

const apiPizzas = async() => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = 'http://localhost:1234/v1/pizzas'

    const response = await fetch(urlTodasPizzasAPI)
    pizzasJSON.statusCode = response.status
    const listaTodasPizzas = await response.json()
    pizzasJSON.message = listaTodasPizzas
    
    console.log(pizzasJSON)
    return pizzasJSON
}

const createCardsPizzas = async (dataPizzas) => {
    const pizzasAPI = await dataPizzas
    // console.log(pizzasAPI.message[0])

    const pizzasContainer = document.getElementById('pizzas_container')

    pizzasAPI.message.forEach(element => {
        pizzasContainer.innerHTML += `
        <pizza-cardapio class="pizza_cardapio" id_produto="${element.id_produto}" id_pizza="${element.id_pizza} id_categoria="${element.id_categoria}" nome_pizza="${element.nome_produto}" nome_categoria="${element.nome_categoria}" foto="${element.foto}" preco="${element.preco}" qntd_favoritos="${element.qntd_favorito}" ingredientes="${element.ingredientes}" ></pizza-cardapio>
        `
    });
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
        this.fot = 'Undefined'
        this.preco = 'Undefined'
        this.qntd_favoritos = 'Undefined'
        this.ingredientes = 'Undefined'
    }

    //pega os atributos
    static get observedAttributes() {
        return ['id_produto', 'id_pizza', 'id_categoria', 'nome_pizza', 'nome_categoria', 'foto', 'preco', 'qntd_favoritos', 'ingredientes'];
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
        return style;
    }

    //conteúdo que 
    component() {
        const card = document.createElement('div');
        card.classList.add('card');
        console.log(this.id)
        card.innerHTML = `
            <a href="../pages/character_page.html?id=${this.id}" class="card_container" target="_blank">
                <div class="img_div">
                </div>
                <span class="hero_name">${this.name}</span>
            </a>
        `
        // <img class="hero_image" src="${this.icon}">

        return card;
    }
}

customElements.define('pizza-cardapio', card);