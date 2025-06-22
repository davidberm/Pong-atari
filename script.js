const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Dimensiones y posiciones
const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 4;
let playerScore = 0;
let aiScore = 0;

// Dibujar elementos
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, ballSize, ballSize);
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
  }
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Jugador 1: ${playerScore}`, 100, 30);
  ctx.fillText(`Jugador 2: ${aiScore}`, canvas.width - 150, 30);
}

// Movimiento
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 4;
}

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
    ballX = paddleWidth;
  }

  // Colisión con IA
  if (checkCollision(canvas.width - paddleWidth, aiY)) {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width - paddleWidth - ballSize;
  }

  // Puntos
  if (ballX < 0) {
    aiScore++;
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  // Movimiento IA simple
  const aiCenter = aiY + paddleHeight / 2;
  if (aiCenter < ballY - 35) aiY += 6;
  else if (aiCenter > ballY + 35) aiY -= 6;
}

// Renderizado
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#000");
  drawNet();
  drawScore();
  drawRect(0, playerY, paddleWidth, paddleHeight, "#fff"); // Jugador
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#fff"); // IA
  drawBall(ballX, ballY);
}

// Loop
function gameLoop() {
  moveBall();
  render();
}

setInterval(gameLoop, 1000 / 60);

// Movimiento jugador
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});
