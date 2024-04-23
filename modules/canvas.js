function createCanvas2D(w,h,display = true){
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!display) canvas.style.display = 'none'
    canvas.width = w, canvas.height = h
    return {canvas,ctx}
}

function noSmooth(ctx){
    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.msImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
}

export { createCanvas2D, noSmooth }

