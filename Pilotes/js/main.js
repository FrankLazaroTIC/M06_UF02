let pilotes = [];
import { Pilota } from "./pilota.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

export function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const width = (canvas.width = window.innerWidth);
console.log(width);
const height = (canvas.height = window.innerHeight);
console.log(height);

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function addPilotes() {
  for (let i = 0; i < 25; i++) {
    let mida = random(10, 20);
    let pilota = new Pilota(
      random(random(0, mida), canvas.width - mida),
      random(random(0, mida), canvas.height - mida),
      random(-5, 10),
      random(-5, 9),
      randomRGB(),
      mida
    );
    pilotes.push(pilota);
  }
}

function colisions() {
  for(let i = 0; i < pilotes.length; i++){
    for(let j = i+1; j < pilotes.length; j++){
      let dx = pilotes[i].x - pilotes[j].x;
      let dy = pilotes[i].y - pilotes[j].y;
      let distancia = Math.sqrt(dx*dx + dy*dy);
      if (distancia < pilotes[i].mida + pilotes[j].mida){
        let colorComu = randomRGB();
        pilotes[i].color = colorComu;
        pilotes[j].color = colorComu;
      }
    }
  }
}

function loop() {
  ctx.fillStyle = "grey";
  ctx.fillRect(0,0,canvas.width, canvas.height);
    for (let pilota of pilotes) {
      pilota.dibuixa(ctx);
      pilota.mou();
    }
    colisions();
    requestAnimationFrame(loop);
  }
  

addPilotes();
loop();