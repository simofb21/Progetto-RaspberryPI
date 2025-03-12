/*
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
    numGreenDots += 4; // Increase the number of green dots for more difficulty
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
*/

/*
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Impostiamo il canvas a schermo intero
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake = [];
const initialSnakeLength = 10;
const snakeSize = 10;
let angle = 0;
let speed = 3; // Velocità di base iniziale
let score = 0;
const difficultyIncrement = 0.2;
const dotSize = 10;

let greenDots = [];
let goldDots = [];
let numGreenDots = 10;
const numGoldDots = 192;

// Variabili di appoggio per calcolo dell'angolo sulla base della posizione ricevuta
let oldX = canvas.width / 2;
let oldY = canvas.height / 2;
let currentX = oldX;
let currentY = oldY;

function initializeGame() {
    snake = [];
    for (let i = 0; i < initialSnakeLength; i++) {
        // Imposta i segmenti iniziali del serpente verso sinistra (arbitrario)
        snake.push({ x: oldX - i * snakeSize, y: oldY });
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
    speed = 3;
    numGreenDots = 10;
}

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width - dotSize)),
        y: Math.floor(Math.random() * (canvas.height - dotSize))
    };
}

async function fetchPosition() {
    try {
        const response = await fetch('/get_position');
        const data = await response.json();
        // Se la posizione ha valori numerici validi, aggiorna la currentX/Y
        if (data.x !== null && data.y !== null) {
            currentX = parseFloat(data.x);
            currentY = parseFloat(data.y);
        }
    } catch (error) {
        console.error('Errore nel recupero della posizione:', error);
    }
}

function update() {
    // Esegui fetchPosition una volta per aggiornare currentX/Y
    // Qui usiamo una tecnica semplificata: la chiamiamo sincronicamente
    // su base di requestAnimationFrame. In alternativa, si potrebbero usare
    // setInterval o altre soluzioni.
    fetchPosition().then(() => {
        // Calcola l'angolo sulla base della differenza (currentX, currentY) e (snake[0].x, snake[0].y)
        const headX = snake[0].x;
        const headY = snake[0].y;
        const dx = currentX - headX;
        const dy = currentY - headY;
        angle = Math.atan2(dy, dx);

        // Esegui il movimento
        const head = {
            x: headX + Math.cos(angle) * speed,
            y: headY + Math.sin(angle) * speed
        };

        snake.unshift(head);

        if (snake.length > initialSnakeLength + score) {
            snake.pop();
        }

        // Collisione con greenDots
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

        // Collisione con goldDots
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
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna il serpente
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    // Disegna i punti verdi
    ctx.fillStyle = 'green';
    greenDots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, dotSize, dotSize);
    });

    // Disegna i punti dorati
    ctx.fillStyle = 'gold';
    goldDots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, dotSize, dotSize);
    });

    // Disegna il punteggio
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function increaseDifficulty() {
    speed += difficultyIncrement;
    numGreenDots += 4;
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
*/