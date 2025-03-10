const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake = [];
const initialSnakeLength = 10;
const snakeSize = 10;
let angle = 0;
let speed = 3; // Increased initial speed
let score = 0;
const difficultyIncrement = 0.2; // Increased difficulty increment
let greenDots = [];
let goldDots = [];
const dotSize = 10;
let numGreenDots = 10;
const numGoldDots = 192;

function initializeGame() {
    snake = [];
    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({ x: canvas.width / 2 - i * snakeSize, y: canvas.height / 2 });
    }

    greenDots = [];
    for (let i = 0; i < numGreenDots; i++) {
        greenDots.push(getRandomPosition());
    }

    goldDots = [];
    for (let i = 0; i < numGoldDots; i++) {
        goldDots.push(getRandomPosition());
    }

    score = 0;
    speed = 3; // Reset initial speed
    numGreenDots = 10; // Reset initial number of green dots
}

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width - dotSize)),
        y: Math.floor(Math.random() * (canvas.height - dotSize))
    };
}

window.addEventListener('mousemove', (e) => {
    const dx = e.clientX - snake[0].x;
    const dy = e.clientY - snake[0].y;
    angle = Math.atan2(dy, dx);
});

function update() {
    const head = {
        x: snake[0].x + Math.cos(angle) * speed,
        y: snake[0].y + Math.sin(angle) * speed
    };

    snake.unshift(head);

    if (snake.length > initialSnakeLength + score) {
        snake.pop();
    }

    // Check collision with green dots
    for (const dot of greenDots) {
        if (head.x < dot.x + dotSize &&
            head.x + snakeSize > dot.x &&
            head.y < dot.y + dotSize &&
            head.y + snakeSize > dot.y) {
            alert(`Game Over! Your score: ${score}`);
            initializeGame();
            return;
        }
    }

    // Check collision with gold dots
    for (let i = 0; i < goldDots.length; i++) {
        const dot = goldDots[i];
        if (head.x < dot.x + dotSize &&
            head.x + snakeSize > dot.x &&
            head.y < dot.y + dotSize &&
            head.y + snakeSize > dot.y) {
            score++;
            goldDots.splice(i, 1);
            goldDots.push(getRandomPosition());
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    ctx.fillStyle = 'green';
    greenDots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, dotSize, dotSize);
    });

    ctx.fillStyle = 'gold';
    goldDots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, dotSize, dotSize);
    });

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function increaseDifficulty() {
    speed += difficultyIncrement;
    numGreenDots += 2; // Increase the number of green dots for more difficulty
    for (let i = 0; i < 2; i++) {
        greenDots.push(getRandomPosition());
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

initializeGame();
setInterval(increaseDifficulty, 5000);
gameLoop();