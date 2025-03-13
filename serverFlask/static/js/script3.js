const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let speed = 3;
var snake;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funzione di supporto per ottenere un intero casuale (min incluso, max escluso)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Genera 50 punti gialli e 50 punti rossi in posizioni casuali
const yellowPoints = [];
const redPoints = [];

for (let i = 0; i < 50; i++) {
    yellowPoints.push({
        x: getRandomInt(canvas.width),
        y: getRandomInt(canvas.height)
    });
}

for (let i = 0; i < 50; i++) {
    redPoints.push({
        x: getRandomInt(canvas.width),
        y: getRandomInt(canvas.height)
    });
}

function drawSnake() {
    const snakeSegmentWidth = 40;
    const snakeSegmentHeight = 10;
    // Calcola la posizione in modo che il rettangolo (testa del serpente) sia centrato
    const startX = (canvas.width - snakeSegmentWidth) / 2;
    const startY = (canvas.height - snakeSegmentHeight) / 2;
    ctx.fillStyle = "green";
    ctx.fillRect(startX, startY, snakeSegmentWidth, snakeSegmentHeight);
}

function drawPoints() {
    // Disegna i punti gialli
    ctx.fillStyle = "yellow";
    yellowPoints.forEach(point => {
        ctx.fillRect(point.x, point.y, 5, 5); // ogni punto ha dimensione 5x5
    });
    // Disegna i punti rossi
    ctx.fillStyle = "red";
    redPoints.forEach(point => {
        ctx.fillRect(point.x, point.y, 5, 5);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawPoints();
    // ...altre eventuali chiamate di disegno...
}

// Esempio: aggiornamento ad ogni frame
setInterval(draw, 1000/60);