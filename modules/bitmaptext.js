class Font {
    constructor(img,data) {
        this.img = img;
        this.common = data.font.common;
        this.info = data.font.common;
        this.chars = {}
        let char_ = data.font.chars.char
        for (let i = 0; i < char_.length; i++){
            let code = char_[i]._id
            let ch = String.fromCharCode(code)
            this.chars[ch] = char_[i]
        }
    }

    static async load(src) {
        let img, data
        await new Promise( (resolve, reject) => {
            img = new Image();
            img.src = `${src}.png`;
            img.addEventListener('load', function() {
                resolve(true);
            })
        })
        const response = await fetch(`${src}.json`)
        data = await response.json();
        return new Font(img,data);
    }
}

class Text {
    constructor(text, font, color){
        this.spacing = -1;
        const textArray = text.split('')


        const height = font.common._lineHeight
        const width = textArray
            .map( ch => parseInt(font.chars[ch]._xadvance) + this.spacing )
            .reduce((partialSum, a) => partialSum + a, 0)

        const buffer = document.createElement('canvas');
        const bufferCtx = buffer.getContext('2d')
        buffer.width = width, buffer.height = height


        let currentX = 0;

        bufferCtx.save();
        textArray.forEach( ch => {
            let char = font.chars[ch]
            let x = currentX + parseInt(char._xoffset),
                y = parseInt(char._yoffset)
            console.log(char)
            bufferCtx.drawImage(font.img,char._x,char._y,char._width,char._height,x,y,char._width,char._height)
            currentX += parseInt(char._xadvance) + this.spacing
        })
        bufferCtx.fillStyle = color;
		bufferCtx.globalCompositeOperation = "source-in";
		bufferCtx.fillRect(0,0,width,height);
		bufferCtx.restore();

        this.width = width,
        this.height = height,
        this.buffer = buffer
    }

    draw(ctx,x,y,sc=1){
        ctx.save()
        ctx.translate(x,y)
        ctx.scale(sc,sc)
        ctx.translate(-this.width/2|0,-this.height/2|0)
        ctx.drawImage(this.buffer,0,0,this.width,this.height,0,0,this.width,this.height)
        ctx.restore()
    }

}

export { Font, Text }