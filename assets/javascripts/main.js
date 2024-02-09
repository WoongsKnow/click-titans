const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
const cactus = new Cactus();
cactus.draw();
// 1초를 계산하기 위한 타이머
let timer = 0;
const cactusList = [];
// 주사율에 따라 프레임이 만들어짐
const move = () => {
  requestAnimationFrame(move);
  timer++; //
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(timer % 60 === 0) {
    const cactus = new Cactus();
    cactusList.push(cactus)
  }
  cactusList.forEach((a) => {
    a.x -= 5;
    a.draw();
  })
  dino.draw();
}
move();
