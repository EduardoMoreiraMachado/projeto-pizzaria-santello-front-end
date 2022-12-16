

const listarCategorias = async (tipo) => {

    const url = `http://192.168.1.204:1206/v1/categorias/${tipo}`

    const response = await fetch(url)

    const mensagens = await response.json()

    console.log(mensagens.categorias)
    return mensagens.categorias
}

const createCategorias = async function(tipo) {
    const categoriasAPI = await listarCategorias(tipo)

    console.log(categoriasAPI)
    const categoriasContainer = document.getElementById('options_container')

    categoriasAPI.forEach(element => {
        const optionsContainer = document.createElement('div')
        optionsContainer.classList.add('radio__container')

        const option = document.createElement('input')
        option.classList.add('input__categoria')
        option.type = 'radio'
        option.name = 'categoria'
        option.value = element.id
        
        const text = document.createElement('label')
        text.textContent = element.nome

        optionsContainer.appendChild(option)
        optionsContainer.appendChild(text)

        categoriasContainer.appendChild(optionsContainer)
    });
        
    categoriasContainer.style.display = 'grid'
    categoriasContainer.style.gridTemplateColumns = 'auto auto auto'
    categoriasContainer.style.gap = '30px'
    categoriasContainer.style.alignItems = 'start'

}

const createAllCategorias = async function() {
    const pizzaAPI = await listarCategorias(1)

    const bebidaAPI = await listarCategorias(2)
    
    const pizzasContainer = document.getElementById('categoria_pizzas')

    pizzaAPI.forEach(element => {
        const optionsContainer = document.createElement('div')
        optionsContainer.classList.add('radio__container')

        const option = document.createElement('input')
        option.classList.add('option_tipo')
        option.type = 'radio'
        option.name = 'pizza'
        option.value = element.id
        
        
        const text = document.createElement('label')
        text.textContent = element.nome

        optionsContainer.appendChild(option)
        optionsContainer.appendChild(text)

        pizzasContainer.appendChild(optionsContainer)
    });
        
    pizzasContainer.style.display = 'grid'
    pizzasContainer.style.gridTemplateColumns = 'auto'
    pizzasContainer.style.gap = '10px'
    //pizzasContainer.style.backgroundColor = 'tomato'
    pizzasContainer.style.alignItems = 'start'

    const bebidasContainer = document.getElementById('categoria_bebidas')

    bebidaAPI.forEach(element => {
        const optionsContainer = document.createElement('div')
        optionsContainer.classList.add('radio__container')

        const option = document.createElement('input')
        option.classList.add('option_tipo')
        option.type = 'radio'
        option.name = 'bebida'
        option.value = element.id
        
        const text = document.createElement('label')
        text.textContent = element.nome

        optionsContainer.appendChild(option)
        optionsContainer.appendChild(text)

        bebidasContainer.appendChild(optionsContainer)
    });
        
    bebidasContainer.style.display = 'grid'
    bebidasContainer.style.gridTemplateColumns = 'auto'
    bebidasContainer.style.gap = '10px'
    //bebidasContainer.style.backgroundColor = 'tomato'
    bebidasContainer.style.alignItems = 'start'
}

//await createAllCategorias()

export { createCategorias, createAllCategorias }
