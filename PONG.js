
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 100;
var paddleWidth2 = 100;
var paddleHeight2 = 10;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleX2 = (canvas.width-paddleWidth2)/2;

var rightPressed = false;
var leftPressed = false;
var aPressed = false;
var dPressed = false;

var context = canvas.getContext('2d');
let hitCount = 0

var RectX = 0;
var RectY = canvas.height / 2;
var rectHeight = 15;
var rectWidth = canvas.width;

var rY = canvas.height/2 - 15
var rX = 100
var rDX = 1

let b = false
var answer = 2
var colorP1 = '#ff073a'
var colorP2 = '#ff073a'
var ballColor = '#39ff14'

var colorChoise1 = colorP1
var colorChoise2 = colorP2
var colorChoiseB = ballColor
var dy = answer
var dx = answer

var brickHitCount = 0

var brickRowCount = 5;
var brickColumnCount = 2;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = canvas.height / 2 - 25;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

var bleep = new Audio(); 
bleep.src = "bleep2.mp3"
var bleep2 = new Audio(); 
bleep2.src = "bleep2.mp3"
var bleep3 = new Audio(); 
bleep3.src = "bleep3.mp3"
bleep3.volume = 0.6
let box = document.createElement('div')
let start = document.createElement('div')

let box2 = document.createElement('div')
let tryAgain = document.createElement('div')

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);


function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {

          var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#fe0000";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            bleep3.play();
          }
        }
      }
    }
  }

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+hitCount, 8, 20);
}

function drawUserName() {
    ctx.font = '16px Arial';
    ctx.fillStyle = "#0095DD";
    ctx.fillText("User: "+localStorage.getItem("userName"), 8, 43);
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function keyDownHandler2(e) {
    if(e.key == "d" || e.key == "D") {
        dPressed = true;
    }
    else if(e.key == "a" || e.key == "A") {
        aPressed = true;
    }
}

function keyUpHandler2(e) {
    if(e.key == "d" || e.key == "D") {
        dPressed = false;
    }
    else if(e.key == "a" || e.key == "A") {
        aPressed = false;
    }
}
function createBox(){
    if(!localStorage.getItem("userName")){
// PONG 
        document.body.append(box)
        title = document.createElement('h1')
        title.innerText = "PONG"
        box.append(title)
        title.style.position = 'absolute'
        title.style.left = '73px'
        title.style.fontSize = '56px'
        title.style.bottom = '83px'
// With a twist 
        title2 = document.createElement('h3')
        title2.innerText = "(with a twist)"
        box.append(title2)
        title2.style.position = 'absolute'
        title2.style.left = '95px'
        title2.style.bottom = '80px'
        title2.style.fontSize = '20px'
// Start button 
        box.append(start);
        start.style.height = "40px"
        start.style.width = "100px"
        start.style.backgroundColor = "blue"
        start.style.position = 'absolute'
        start.style.left = '100px'
        start.style.bottom = '27px'
// Input box 
        const inputName = document.createElement('INPUT')
        box.append(inputName)
        inputName.setAttribute("type", "text");
        inputName.style.position = 'absolute'
        inputName.style.left = '45px'
        inputName.style.bottom = '70px'
        inputName.style.fontSize = '20px'

        box.style.height = "200px"
        box.style.width = "300px"
        box.style.backgroundColor = "red"
        box.style.position = 'absolute'
        box.style.left = '567px'
        box.style.bottom = canvas.height / 2 + 'px'
    } else {
        startGame()
    }
}


function gameover(){
    document.body.append(box2)
// GAME OVer
    endText = document.createElement('h1')
    endText.innerText = "GAME OVER"
    box2.append(endText)
    endText.style.position = 'absolute'
    endText.style.left = '20px'
    endText.style.top = '-5px'
    endText.style.fontSize = '40px'
// Score 
    scoreText = document.createElement('h2')
    scoreText.innerText = "SCORE: " + hitCount;
    endText.append(scoreText)
    scoreText.style.position = 'absolute'
    scoreText.style.left = '75px'
    scoreText.style.top = '35px'
    scoreText.style.fontSize = '25px'
// Try again button 
    box2.append(tryAgain);
    tryAgain.style.height = "50px"
    tryAgain.style.width = "100px"
    tryAgain.style.backgroundColor = "blue"
    tryAgain.style.position = 'absolute'
    tryAgain.style.left = '100px'
    tryAgain.style.bottom = '27px'
 // Log out button 
    var logOut = document.createElement("BUTTON");
    logOut.innerHTML = "LOG OUT";
    box2.append(logOut);
    logOut.style.fontSize = '15px'
    logOut.style.backgroundColor = "blue"
    logOut.style.position = 'absolute'
    logOut.style.left = '0px'
    logOut.addEventListener("click", ()=> {
        localStorage.clear()
        reStartGame()
    }
        
        )
        ;

    box2.style.height = "200px"
    box2.style.width = "300px"
    box2.style.backgroundColor = "red"
    box2.style.position = 'absolute'
    box2.style.left = '567px'
    box2.style.bottom = canvas.height / 2 + 'px'
}

function createButton(){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "START";
    start.append(btn);
    btn.style.fontSize = '38px'
    btn.style.backgroundColor = "blue"
    btn.style.position = 'absolute'
    btn.style.left = '-13px'
    btn.addEventListener("click", ()=>{
        const inputName = document.querySelector("input").value
        localStorage.setItem("userName", inputName)
        startGame()
    });
  }

  function createButton2(){
    var btn2 = document.createElement("BUTTON");
    btn2.innerHTML = "TRY AGAIN";
    tryAgain.append(btn2);
    btn2.style.fontSize = '20px'
    btn2.style.backgroundColor = "blue"
    btn2.style.position = 'absolute'
    btn2.style.left = '0px'
    btn2.addEventListener("click", reStartGame);
  }
createButton()
createButton2()
function startGame(){
    interval = setInterval(draw, 10);
    box.remove()
}
function reStartGame(){
    document.location.reload();
    // interval = setInterval(draw, 10);
    // box.remove()
}
function drawRect() {
    ctx.beginPath();
    ctx.rect(RectX, RectY - 10, rectWidth, rectHeight);
    let previousStyle = ctx.fillStyle
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillStyle = previousStyle
    ctx.closePath();
}
createBox();

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0 - paddleHeight2, Math.PI*2);
    ctx.fillStyle = colorChoiseB;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = colorChoise1;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, 0, paddleWidth2, paddleHeight2);
    ctx.fillStyle = colorChoise2;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddle2();
    drawScore();
    drawUserName();


    if(hitCount >= 11){
        drawBricks();
        collisionDetection();
    }

    if(hitCount >= 5) {
        drawRect();
        if(y + dy < RectY + rectHeight && hitCount >= 3) {
            brickHitCount = brickHitCount + 1;
            dy = -dy;
            bleep3.play();

            if(brickHitCount >= 1){
                rectHeight = 10
            }
            if(brickHitCount >= 2) {
                rectHeight = 5
            }
            if(brickHitCount >= 3){
            RectX = 0
            RectY = 0
            rectHeight = 0
            rectWidth = 0
            }
            }
            
    }

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        bleep2.play()
    }
    //To make ball bounce off paddles
    if(y + dy < ballRadius) {
        if(x > paddleX2 && x < paddleX2 + paddleWidth2) {
            dy = -dy;
            dy += .15;
            dx += .15;
            hitCount = hitCount + 1;
            bleep.play()
        }
    else {


        clearInterval(interval);
        gameover();
    }
    }
    else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dy -= .15;
            dx -= .15;
            hitCount = hitCount + 1;
            console.log('playinig 1')
            bleep.play()

    }
    else {
        clearInterval(interval);
        gameover()
    }
    }


    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    if(dPressed && paddleX2 < canvas.width-paddleWidth2) {
        paddleX2 += 5;
    }
    else if(aPressed && paddleX2 > 0) {
        paddleX2 -= 5;
    }
    x += dx;
    y += dy;
    rX += rDX;
}
 
