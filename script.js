const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerScore = 0;
let aiScore = 0;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, ballSize, ballSize);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
  ballSpeedY = 5;
}

function moveAI() {
  let aiCenter = aiY + paddleHeight / 2;
  if (aiCenter < ballY - 35) aiY += 6;
  else if (aiCenter > ballY + 35) aiY -= 6;
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
  }
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Jugador 1: ${playerScore}`, 100, 30);
  ctx.fillText(`Jugador 2: ${aiScore}`, canvas.width - 150, 30);
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Colisión de paletas de jugadores
  if (ballX <= paddleWidth &&
      ballY > playerY &&
      ballY < playerY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Colisión de paletas
  if (ballX + ballSize >= canvas.width - paddleWidth &&
      ballY > aiY &&
      ballY < aiY + paddleHeight) {
    ballSpeedX *= -1;
  }

  //Salida izquierda o derecha
  if (ballX < 0) {
    aiScore++;
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  moveAI();
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#000000");
  drawNet();
  drawScore();
  drawRect(0, playerY, paddleWidth, paddleHeight, "#fff");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#fff");
  drawBall(ballX, ballY);
}


let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSize = 10;
let ballSpeedX = 5;
let ballSpeedY = 4;

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;



function checkCollision(paddleX, paddleY) {
  return (
    ballX < paddleX + paddleWidth &&
    ballX + ballSize > paddleX &&
    ballY < paddleY + paddleHeight &&
    ballY + ballSize > paddleY
  );
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisión con bordes
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Colisión con jugador
  if (checkCollision(0, playerY)) {
    ballSpeedX = -ballSpeedX;
    ballX = paddleWidth; // evitar que se quede pegada
  }

  // Colisión con IA
  if (checkCollision(canvas.width - paddleWidth, aiY)) {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width - paddleWidth - ballSize;
  }

  // Punto para la IA o el jugador
  if (ballX < 0 || ballX > canvas.width) {
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 4;
}







  
  // Colisión con bordes
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#000");
  drawRect(0, playerY, paddleWidth, paddleHeight, "#fff");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#fff");
  drawBall(ballX, ballY, ballSize, "#fff");
}

function gameLoop() {
  moveBall();
  render();
}

setInterval(gameLoop, 1000 / 60);


function game() {
  update();
  render();
}

setInterval(game, 1000 / 60);

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});
