import { canvas,randomRGB } from "./main.js";

export class Pilota {
  constructor(x, y, velX, velY, color, mida) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.mida = mida;
  }

  dibuixa(ctx) {
    ctx.beginPath(); // Per començar a dibuixar formes al canvas
    ctx.fillStyle = this.color; //Color amb que dibuixarem
    ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); //Dibuix d’un arc
    ctx.fill(); // Finalitza el dibuix i l’omple amb el color ja esmenat
  }
  mou() {
    if (this.x + this.mida >= canvas.width) {
        this.velX = -this.velX;
    } else if (this.x - this.mida <= 0) {
        this.velX = -this.velX;
    } else if (this.y - this.mida <= 0) {
        this.velY = -this.velY;
    } else if (this.y + this.mida >= canvas.height) {
        this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }
}