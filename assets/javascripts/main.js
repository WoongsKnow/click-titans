const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let isJump = false;
const image = new Image();
image.src = 'assets/images/img_cat_next.png'
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(image, this.x, this.y, 50, 50)
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
let jumpTimer = 0;
const cactusList = [];
let animation;
// 주사율에 따라 프레임이 만들어짐
const move = () => {
  animation = requestAnimationFrame(move);
  timer++; //
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(timer % 60 === 0) {
    const cactus = new Cactus();
    cactusList.push(cactus)
  }
  cactusList.forEach((a, index, o) => {
    //x좌표가 0 미만이면 제거.
    if(a.x < 0) {
      //제거해라
      o.splice(index, 1)
    }
    a.x -= 5;

    if(check(dino, a)) {
      cancelAnimationFrame(animation)
    }
    a.draw();
  })
  if(isJump === true) {
    dino.y -= 5;
    jumpTimer++;
  } else {
    if(dino.y < 200) {
      dino.y += 5;
    } else {
      jumpTimer = 0;
    }
  }

  if(jumpTimer > 20) {
    isJump = false;
  }
  dino.draw();
}
move();

// 충돌 확인
const check = (dino, cactus) => {
  const x = cactus.x - (dino.x + dino.width);
  const y = cactus.y - (dino.y + dino.height);
  // console.log(x, y)
  if(x < 0 && y < 0) {
    return true;
  }
  return false;
}
document.addEventListener('keydown', (e) => {
  console.log(e.code)
  if(e.code === 'Space') {
    isJump = true;
  }
});
