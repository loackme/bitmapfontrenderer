// (c) loackme <loic@loack.me>; MIT License (MIT)
// v 1.1 09-02-2024

export class Random {
  constructor(r=Math.random){
    this.random  = r
  }

  rb(p,decimal=6){
    const f = 10**decimal
    return Math.round(this.random()*f)/f < p
  }
  
  randomUniform(vmin,vmax,decimal=6){
    const f = 10**decimal
    let r = (vmax - vmin)*this.random() + vmin
    return Math.round(r*f)/f
  }
  
  randomGauss(m,std,range=[-Infinity,Infinity],decimal=6){
    const f = 10**decimal
    let u1 = 0, u2 = 0
    while (u1 === 0) u1 = this.random()
    while (u2 === 0) u2 = this.random()
    const r = Math.sqrt(-2.0*Math.log(u1))
    const theta = 2*Math.PI*u2
    const u = r*Math.cos(theta)
    const v = m + std*u
    if (v < range[0] || v > range[1]){
      return this.randomGauss(m,std,range,decimal)
    }
    return Math.round(v*f)/f
  }
  
  randomPick(values,W=false,decimal=6){
    const f = 10**decimal
    W = W || new Array(values.length).fill(1)
    let sum = 0
    for (let i = 0; i < W.length; i++) sum += W[i]
    if (sum == 0) return false
    var p = (Math.round(f*this.random())/f)*sum;
    for(let i = 0; i < W.length; i++){
        p -= W[i];
        if (p <= 0) return values[i]
    }
  }
}