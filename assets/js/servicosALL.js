'use strict'

const apiPizzas = async () => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = `http://192.168.1.204:1206/v1/servicos`

    const response = await fetch(urlTodasPizzasAPI)
    pizzasJSON.statusCode = response.status
    const listaTodasPizzas = await response.json()
    pizzasJSON.message = listaTodasPizzas.servicos

    console.log(pizzasJSON)
    return pizzasJSON
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
        <pizza-cardapio class="pizza_cardapio" id_servico="${element.id}" nome="${element.nome}" foto="${element.foto}" descricao=""${element.descricao}></pizza-cardapio>
        `
        console.log(element)
    });
}

await createCardsPizzas(apiPizzas())


//classe HTMLElement
class card extends HTMLElement {
    //criação das variáveis que vão receber os atributos
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.id_servico = 'Undefined'
        this.nome = 'Undefined'
        this.foto = 'Undefined'
        this.descricao = 'Undefined'
    }

    //pega os atributos
    static get observedAttributes() {
        return ['id_servico', 'nome', 'foto', 'descricao'];
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
            background-color: var(--color-medium);
            padding-bottom: 12px;
            border-radius: 30px;
        }
            
        .card-pizza:hover {
            box-shadow: inset 0px -60px 0px var(--bg-color);
            color: var(--color-medium);
        }  
        
        `
        return style;
    }
    //conteúdo que 
    component() {
        const card = document.createElement('a');
        card.classList.add('card-pizza');
        card.href = `./UPservico.html?id=${this.id_servico}`
        
        const imgPizza = document.createElement('div')
        imgPizza.classList.add('img__pizza')
        card.appendChild(imgPizza)

        const nome_ingrediente = document.createElement('div')
        nome_ingrediente.classList.add('nome-ingredientes__container')
        card.appendChild(nome_ingrediente)

        const nome = document.createElement('span')
        nome.classList.add('nome__pizza')
        nome.textContent = `${this.nome}`
        nome_ingrediente.appendChild(nome)
        
        //console.log(this.qntd_favoritos)

        return card;
    }
}

customElements.define('pizza-cardapio', card);

