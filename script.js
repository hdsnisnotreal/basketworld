const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player3 = document.getElementById('player3');
const player4 = document.getElementById('player4');
const player5 = document.getElementById('player5');
const ball = document.getElementById('ball');
const shotClock = document.getElementById('shot-clock');
const team1Score = document.getElementById('team1-score');
const team2Score = document.getElementById('team2-score');
const quarter = document.getElementById('quarter');

let player1X = 50;
let player1Y = 50;
let player2X = 50;
let player2Y = 150;
let player3X = 50;
let player3Y = 250;
let player4X = 550;
let player4Y = 50;
let player5X = 550;
let player5Y = 150;
let ballX = 290;
let ballY = 200;
let shotClockTime = 24;
let team1Points = 0;
let team2Points = 0;
let currentQuarter = 1;

player1.style.top = player1Y + 'px';
player1.style.left = player1X + 'px';
player2.style.top = player2Y + 'px';
player2.style.left = player2X + 'px';
player3.style.top = player3Y + 'px';
player3.style.left = player3X + 'px';
player4.style.top = player4Y + 'px';
player4.style.left = player4X + 'px';
player5.style.top = player5Y + 'px';
player5.style.left = player5X + 'px';
ball.style.top = ballY + 'px';
ball.style.left = ballX + 'px';
shotClock.innerHTML = shotClockTime;
team1Score.innerHTML = team1Points;
team2Score.innerHTML = team2Points;
quarter.innerHTML = 'Q' + currentQuarter;

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    // Move player left
  } else if (event.code === 'ArrowRight') {
    // Move player right
  } else if (event.code === 'ArrowUp') {
    // Jump
  } else if (event.code === 'Space') {
    // Pass
  }
});

function moveAI() {
  // Move AI players
}

function updateScore() {
  // Update score
}

function updateShotClock() {
  // Update shot clock
}

setInterval(moveAI, 1000);
setInterval(updateScore, 1000);
setInterval(updateShotClock, 1000);
