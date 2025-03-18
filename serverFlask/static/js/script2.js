// Variabili globali per x e y
let x = 0;
let y = 0;
let snakeSize  = 30;
let joystick = true;
document.addEventListener('keydown', getPositionWasd);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
async function getPositionWasd(event) { //se va in errore ottengo da wasd
    switch( event.key) {
        case 's':
            y += snakeSize;
            break;
        case 'a':
            x -= snakeSize;
            break;
        case 'w':
            y -= snakeSize;
            break;
        case 'd':
            x += snakeSize;
            break;
        default:
            return;
    }
}
async function getPositionJoystick() { //ottengo dal joystick
  try {
    const response = await fetch('http://indirizzoIP/get_position'); //  richiesta GET al server
    if (!response.ok) {
      throw new Error('Errore nella richiesta: ' + response.status);
    }
    const data = await response.json(); // convrto la risposta in JSON
    
    x = data.x -snakeSize; //assegna i valori di x e y
    y = data.y -snakeSize;
    joystick = true;
    }catch(error){
        joystick = false;
    }

}
function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //pulisco il canvas
    ctx.fillStyle = 'green'; 
    ctx.fillRect(x, y, snakeSize, snakeSize); //diseggno
}
function moveSnake() {
    if(joystick)
        getPositionJoystick();
    //altrimenti premendo da tastiera userà wasd 
    if (x < 0) x = canvas.width - snakeSize;
    if (x >= canvas.width) x = 0;
    if (y < 0) y = canvas.height - snakeSize;
    if (y >= canvas.height) y = 0;
}
function gameLoop() {
    moveSnake();
    drawSnake();
}
setInterval(gameLoop, 100); //ogni 100ms chiama gameLoop        