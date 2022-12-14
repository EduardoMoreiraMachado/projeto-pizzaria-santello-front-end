'use strict'

const apiPizzas = async() => {
    const pizzasJSON = {}

    const urlTodasPizzasAPI = 'http://localhost:1206/v1/pizzas'

    const response = await fetch(urlTodasPizzasAPI)
    pizzasJSON.statusCode = response.status
    const listaTodasPizzas = await response.json()
    pizzasJSON.message = listaTodasPizzas
    
    console.log(pizzasJSON)
    return pizzasJSON
}

const listarCategorias = async (tipo) => {

    const url = `http://localhost:1206/v1/categorias/${tipo}`

    const response = await fetch(url)

    const mensagens = await response.json()

    return mensagens.categorias
}

const createDropDown = async function() {
    const select = document.getElementById('categorias')

    const categoria = document.createElement('option')
}

const createCardsPizzas = async (dataPizzas) => {
    const pizzasAPI = await dataPizzas
    // console.log(pizzasAPI.message[0])

    const pizzasContainer = document.getElementById('pizzas_container')

    pizzasAPI.message.forEach(element => {
        pizzasContainer.innerHTML += `
        <pizza-cardapio class="pizza_cardapio" id_produto="${element.id_produto}" id_pizza="${element.id_pizza}" id_categoria="${element.id_categoria}" nome_pizza="${element.nome_produto}" nome_categoria="${element.nome_categoria}" foto="${element.foto}" preco="${element.preco}" qntd_favoritos="${element.qntd_favorito}" ingredientes="${element.ingredientes}" ></pizza-cardapio>
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
        this.foto = 'Undefined'
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

        style.textContent = `
        .like {
            font-style: normal;
        }

        input[type="checkbox"]{
            -webkit-appearance: none;
        }
        
        label{
            transition: 0.5s;
        }
        
        i {
            font-size: 80px;
            -webkit-text-stroke: 4px var(--color-medium);
            color: #fff1;
        }
        
        input[type="checkbox"]:checked + label i {
            color: var(--color-medium);
            -webkit-text-stroke: 0 #fff0;
            transition: 0.5s;
        }
        `
        return style;
    }
    //conteúdo que 
    component() {
        const card = document.createElement('div');
        card.classList.add('card-pizza');
        
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

        const ingredientes = document.createElement('span')
        ingredientes.classList.add('ingredientes')
        ingredientes.textContent = `${this.ingredientes}`
        nome_ingrediente.appendChild(ingredientes)

        const preco_fav = document.createElement('div')
        preco_fav.classList.add('preco__fav__container')
        card.appendChild(preco_fav)

        const preco = document.createElement('span')
        preco.classList.add('preco__pizza')
        let precoPizza = this.preco

        // estrutura de lógica para preencher as casas decimais do preço
        if (precoPizza.split('.').length > 1) {
            if (precoPizza.split('.')[1].length > 1) {
                preco.textContent = `R$ ${precoPizza.split('.')}`
            }

            else {
                preco.textContent = `R$ ${precoPizza.split('.')}0`
            }
        }
        
        else {
            preco.textContent = `R$ ${precoPizza},00`
        }

        preco_fav.appendChild(preco)
        
        var contador
        var teste = `${this.qntd_favoritos}`

        // <input type="checkbox" name="fav_star" id="fav" class="favorito" onclick="${contador} = parseInt(${this.qntd_favoritos}) + 1; console.log(${contador})">
        console.log(this.id_pizza)

        preco_fav.innerHTML += `        
        <input type="checkbox" name="fav_star" id="fav" class="favorito" onclick="contagemFavorito(${this.qntd_favoritos}, ${this.id_pizza})">
        <label for="fav">
            <i class="like" id="like">&#10084;</i>
        </label>
        `
        //console.log(this.qntd_favoritos)

        return card;
    }
}

customElements.define('pizza-cardapio', card);


// const favorito = document.getElementById('like').addEventListener('click', contagemFavorito())