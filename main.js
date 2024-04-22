
import { createCanvas2D, noSmooth } from "./modules/canvas.js"
import { Random } from "./modules/random.js"
import { Font, Text } from "./modules/bitmaptext.js"

const W = 512
const C = createCanvas2D(W,W)
const R = new Random()
const font = await Font.load('./fonts/MEKSans')

setup()
draw()

function setup() {
  document.body.appendChild(C.canvas)
  noSmooth(C.ctx)
}

function draw() {
  C.ctx.fillStyle = "#fff";
  C.ctx.fillRect(0,0,W,W);

  for (let i = 0; i < 10; i++){
    let color = R.randomPick(['#000','#f00','#0f0','#00f'],[1,1,1,1])
    let str = R.randomPick(['YES','NO'],[1,1])
    let x = R.randomUniform(0,W),
        y = R.randomUniform(0,W),
        sc = R.randomUniform(0,32)|0
    let text = new Text(str,font,color)
    text.draw(C.ctx,x,y,sc)
  }
}
