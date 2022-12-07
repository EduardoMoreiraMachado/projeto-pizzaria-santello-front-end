'use strict'

const url = window.location.search.substring(1);
const id01 = url.split('=')[1]
const idADM = id01.split('?')[0]
const nome01 = url.split('=')[2]
const primeiroNome = nome01.split('%20')[0]
const segundoNome = nome01.split('%20')[1]

const perfilLink = document.getElementById('perfil')
perfilLink.href = `./perfil.html?id_adm=${idADM}`

const nomeADM = document.getElementById('nome__adm')
nomeADM.textContent = `${primeiroNome} ${segundoNome}`

const cssNome = nomeADM.style
cssNome.fontFamily = "'League Spartan', sans-serif"
cssNome.marginLeft = '10%'
cssNome.fontSize = '3.8rem'
cssNome.fontWeight = '500'
cssNome.color = 'var(--color-main)'