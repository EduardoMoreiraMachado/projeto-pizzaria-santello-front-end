'use strict'

const url = window.location.search.substring(1);

const optionsArray = ['pizzas', 'bebidas', 'servicos', 'categorias', 'mensagens', 'usuarios', 'perfil']

optionsArray.forEach(element => {
    console.log(element)
    let link = document.getElementById(`${element}`)
    link.href = `../${element}.html?${url}`    
})

console.log('skjfgkd')