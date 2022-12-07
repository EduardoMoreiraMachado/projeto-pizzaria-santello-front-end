'use strict'

const url = window.location.search.substring(1);
const id01 = url.split('=')[1]
const idADM = id01.split('?')[0]
const nome01 = url.split('=')[2]
const primeiroNoke = nome01.split('%20')[0]

const perfilLink = document.getElementById('perfil')
perfilLink.href = `./perfil.html?id_adm=${idADM}`

console.log(nomeOficial)