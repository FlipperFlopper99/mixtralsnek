const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver() {
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //walls
    if(headX < 0 || headX * tileCount >= canvas.width ||
       headY < 0 || headY * tileCount >= canvas.height) {
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //push new SnakePart to the end of the snakeParts array
    while (snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthest item from snakeParts
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX* tileCount, headY * tileCount, tileSize, tileSize);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX* tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if(appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
    }
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if(event.keyCode == 38) {
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40) {
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37) {
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39) {
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
