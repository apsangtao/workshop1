const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;
let player1Score = 0, player2Score = 0;

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = '40px Arial';
    context.fillText(text, x, y);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize < paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            resetBall();
        }
    }

    if (ballX + ballSize > canvas.width - paddleWidth) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            resetBall();
        }
    }

    // Control player paddles
    if (ballY < player2Y + paddleHeight / 2) {
        player2Y -= 6;
    } else {
        player2Y += 6;
    }

    if (ballY < player1Y + paddleHeight / 2) {
        player1Y -= 6;
    } else {
        player1Y += 6;
    }
}

function render() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    // Draw paddles
    drawRect(0, player1Y, paddleWidth, paddleHeight, '#fff');
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, '#fff');

    // Draw ball
    drawCircle(ballX, ballY, ballSize, '#fff');

    // Draw scores
    drawText(player1Score, canvas.width / 4, 50, '#fff');
    drawText(player2Score, 3 * canvas.width / 4, 50, '#fff');
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
