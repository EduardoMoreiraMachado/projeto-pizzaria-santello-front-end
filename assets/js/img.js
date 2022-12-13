
const preview = (urlPreview) => {
    const imgPreview = document.getElementById('img_preview')
    console.log(urlPreview)
    imgPreview.style.background = `url(${urlPreview})`
    imgPreview.style.backgroundRepeat = 'no-repeat'
    imgPreview.style.backgroundSize = 'cover'

    const icone = document.getElementById('input__file')
    icone.style.display = 'none'
}

export { preview }