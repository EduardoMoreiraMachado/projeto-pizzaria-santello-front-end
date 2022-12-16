'use strict'

const apiPizzas = async () => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = `http://192.168.1.204:1206/v1/bebidas`

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
    console.log(pizzasAPI)
    const pizzasContainer = document.getElementById('todas_bebidas_container')
    const cssPizza = pizzasContainer.style
    cssPizza.display = 'grid'
    cssPizza.gridTemplateColumns = 'auto auto auto auto'
    cssPizza.gap = '50px'

    pizzasAPI.message.forEach(element => {
        pizzasContainer.innerHTML += `
        <bebidas-card class="pizza_cardapio" id_produto="${element.id_produto}" id_bebida="${element.id_bebida}" id_categoria="${element.id_categoria}" nome_bebida="${element.nome}" peso_liquido="${element.peso_liquido}" nome_categoria="${element.nome_categoria}" foto="${element.foto}" preco="${element.preco}"></bebidas-card>
        `
        console.log(element.id_bebida)
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
        this.id_bebida = 'Undefined'
        this.id_categoria = 'Undefined'
        this.nome_bebida = 'Undefined'
        this.nome_categoria = 'Undefined'
        this.foto = 'Undefined'
        this.preco = 'Undefined'
        this.peso_liquido = 'Undefined'
    }

    //pega os atributos
    static get observedAttributes() {
        return ['id_produto', 'id_bebida', 'id_categoria', 'nome_bebida', 'nome_categoria', 'foto', 'preco', 'peso_liquido'];
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
        card.href = `./UPbebida.html?id_produto=${this.id_produto}?id_bebida=${this.id_bebida}`
        
        const imgPizza = document.createElement('div')
        imgPizza.classList.add('img__pizza')
        card.appendChild(imgPizza)

        const nome_ingrediente = document.createElement('div')
        nome_ingrediente.classList.add('nome-ingredientes__container')
        card.appendChild(nome_ingrediente)

        const nome = document.createElement('span')
        nome.classList.add('nome__pizza')
        nome.textContent = `${this.nome_bebida}`
        nome_ingrediente.appendChild(nome)

        return card;
    }
}

customElements.define('bebidas-card', card);

