var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg_5.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipe_up.png";
pipeBottom.src = "img/bottom.jpeg";

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 20;
}

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

var gap = 90;
var xPos = 10;
var yPos = 260;
var grav = 1;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, 80, 300);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[x] === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) {
      window.location.reload();
    }
  }

  ctx.drawImage(fg, 0, 800, 800, 100);
  ctx.drawImage(bird, xPos, yPos, 40, 40);

  yPos += grav;
  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
