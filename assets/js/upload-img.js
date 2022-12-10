'use strict'

const file = document.getElementById('img__input').files[0]
const imagePreview = document.getElementById('img__input');
const fileReader = new FileReader();

fileReader.onloadend = () => (imagePreview.src = fileReader.result);

console.log(imagePreview.src)

if (file) {
    fileReader.readAsDataURL(file);
} else {
    imagePreview.src = './img/foto.png';
    console.log('aaa')
}

console.log(file + ' aaaa')