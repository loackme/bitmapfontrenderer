// Generate BMfont file here: https://snowb.org/
// select .xml (BMFont XML) export

class Font {
    constructor(img,xml) {
        this.img = img
        this.common = nodeAttributesToObject(xml.querySelector('common'))
        this.common.spacing = 0
        this.info = nodeAttributesToObject(xml.querySelector('info'))
        this.chars = {}
        let char_ = xml.querySelectorAll('char')
        for (let i = 0; i < char_.length; i++){
            let code = char_[i].id
            let ch = String.fromCharCode(code)
            this.chars[ch] = nodeAttributesToObject(char_[i])
        }
    }

    static async load(src) {
        let img
        await new Promise( (resolve, reject) => {
            img = new Image();
            img.src = `${src}.png`
            img.addEventListener('load', function() {
                resolve(true);
            })
        })
        
        let xml
        await fetch(`${src}.xml`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser()
            xml = parser.parseFromString(data, "application/xml")
        })
        .catch(console.error)

        return new Font(img,xml)
    }

    setSpacing(spacing){
        this.common.spacing = spacing
    }
}

class Text {
    constructor(text, font, color){
        const renderedText = this.renderText(text, font, color)
        this.width = renderedText.width
        this.height = renderedText.height
        this.buffer = renderedText.buffer
    }

    draw(ctx, x, y, sc=1){
        ctx.save()
        ctx.translate(x,y)
        ctx.scale(sc,sc)
        ctx.translate(-this.width/2|0,-this.height/2|0)
        ctx.drawImage(this.buffer,0,0,this.width,this.height,0,0,this.width,this.height)
        ctx.restore()
    }

    renderText(text, font, color){
        const textArray = text.split('')

        const height = font.common.lineHeight
        const width = textArray
            .map( ch => font.chars[ch].xadvance + font.common.spacing )
            .reduce((partialSum, a) => partialSum + a, 0)

        const buffer = document.createElement('canvas');
        const bufferCtx = buffer.getContext('2d')
        buffer.width = width, buffer.height = height

        let currentX = 0;
        textArray.forEach( ch => {
            let char = font.chars[ch]
            let x = currentX + char.xoffset,
                y = char.yoffset
            bufferCtx.drawImage(font.img,char.x,char.y,char.width,char.height,x,y,char.width,char.height)
            currentX += char.xadvance + font.common.spacing
        })
        bufferCtx.fillStyle = color;
		bufferCtx.globalCompositeOperation = "source-in";
		bufferCtx.fillRect(0,0,width,height);

        return {buffer, width, height}
    }
}

function nodeAttributesToObject(node){
    const names = node.getAttributeNames()
    const obj = {}
    names.forEach( (name) => {
        const val = node.getAttribute(name)
        obj[name] = isNaN(Number(val)) ? val : Number(val)
    })
    return obj
}

export { Font, Text }