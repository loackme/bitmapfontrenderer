
import { createCanvas2D, noSmooth } from "./modules/canvas.js"
import { Random } from "./modules/random.js"
import { Font, Text } from "./modules/bitmaptext.js"

const W = 450, H = 600
const C = createCanvas2D(W,H)
const R = new Random()
const font = await Font.load('./fonts/MEKSans') // should include both *.xml and *.png

function setup() {
  document.body.appendChild(C.canvas)
  noSmooth(C.ctx)
  font.setSpacing(-1)
}

function draw() {
  C.ctx.fillStyle = "#fff"
  C.ctx.fillRect(0,0,W,H)

  const N = 20

  for (let n = 0; n < N; n++){
    let color = R.randomPick(['#000','#f00','#0f0','#00f'],[1,1,1,1])
    let str = R.randomPick(['YES','NO','yes','no'])
    let x = R.randomUniform(0,W),
        y = R.randomUniform(0,H),
        sc = R.randomUniform(0,32)|0
    let text = new Text(str,font,color)
    text.draw(C.ctx,x,y,sc)
  }
}

setup()
draw()
