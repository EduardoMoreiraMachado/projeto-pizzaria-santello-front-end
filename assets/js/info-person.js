'use strict'

const url = window.location.search.substring(1);
console.log(url)
const id01 = url.split('=')[1]
const idADM = id01.split('?')[0]
const nome01 = url.split('=')[2]
const nomeURL = nome01.split('%20')

// nome do usuário, extraído da URL e implmentando o replace global para separar o nome (string) com espaços
const nome = String(nomeURL).replace(/,/g, ' ')

const nomeADM = document.getElementById('nome__adm')
nomeADM.textContent = nome

const cssNome = nomeADM.style
cssNome.fontFamily = "'League Spartan', sans-serif"
cssNome.marginLeft = '10%'
cssNome.fontSize = '3.8rem'
cssNome.fontWeight = '500'
cssNome.color = 'var(--color-main)'

const optionsArray = ['pizzas', 'bebidas', 'servicos', 'categorias', 'mensagens', 'usuarios', 'perfil']

optionsArray.forEach(element => {
    let link = document.getElementById(`${element}`)
    link.href = `./${element}.html?${url}`    
})
