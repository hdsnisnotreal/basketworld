const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Game constants
const WIDTH = 800;
const HEIGHT = 600;
const PLAYER_SIZE = 20;
const BALL_SIZE = 10;
const PLAYER_SPEED = 5;
const BALL_SPEED = 8;
const QUARTER_DURATION = 90; // seconds
const SHOT_CLOCK = 24; // seconds

// Player object
class Player {
  constructor(x, y, isAI = false) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.isAI = isAI;
    this.shooting = false;
    this.score = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Ensure the player stays within the canvas bounds
    if (this.x < 0) this.x = 0;
    if (this.x > WIDTH - PLAYER_SIZE) this.x = WIDTH - PLAYER_SIZE;
    if (this.y < 0) this.y = 0;
    if (this.y > HEIGHT - PLAYER_SIZE) this.y = HEIGHT - PLAYER_SIZE;
  }

  draw() {
    ctx.fillStyle = this.isAI ? 'blue' : 'red';
    ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
  }
}

// Ball object
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Ensure the ball stays within the canvas bounds
    if (this.x < 0) this.x = 0;
    if (this.x > WIDTH - BALL_SIZE) this.x = WIDTH - BALL_SIZE;
    if (this.y < 0) this.y = 0;
    if (this.y > HEIGHT - BALL_SIZE) this.y = HEIGHT - BALL_SIZE;
  }

  draw() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.x, this.y, BALL_SIZE, BALL_SIZE);
  }
}

// Input handling
const keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

// Game variables
let players = [];
let ball;
let gameClock = QUARTER_DURATION;
let shotClock = SHOT_CLOCK;

// Initialize game objects
function initialize() {
  players.push(new Player(100, HEIGHT / 2 - PLAYER_SIZE / 2));
  players.push(new Player(WIDTH - 100 - PLAYER_SIZE, HEIGHT / 2 - PLAYER_SIZE / 2, true));
  ball = new Ball(WIDTH / 2 - BALL_SIZE / 2, HEIGHT / 2 - BALL_SIZE / 2);
}

// Update game state
function update() {
  // Player movement
  if (keys['ArrowLeft']) {
    players[0].speedX = -PLAYER_SPEED;
  } else if (keys['ArrowRight']) {
    players[0].speedX = PLAYER_SPEED;
  } else {
    players[0].speedX = 0;
  }

  if (keys['ArrowUp']) {
    players[0].speedY = -PLAYER_SPEED;
  } else if (keys['ArrowDown']) {
    players[0].speedY = PLAYER_SPEED;
  } else {
    players[0].speedY = 0;
  }

  // Ball movement
  if (keys['Space']) {
    players[0].shooting = true;
  } else {
    players[0].shooting = false;
  }

  // Update AI player
  updateAI();

  // Update player and ball positions
  players.forEach(player => player.update());
  ball.update();

  // Game clock
  if (gameClock > 0) {
    gameClock -= 1 / 60; // Subtract time per frame (assuming 60 FPS)
    if (gameClock < 0) gameClock = 0;
  } else {
    // Game over
  }

  // Shot clock
  if (shotClock > 0) {
    shotClock -= 1 / 60; // Subtract time per frame (assuming 60 FPS)
    if (shotClock < 0) shotClock = 0;
  } else {
    // Shot clock violation
  }

  // Check for scoring
  checkScoring();
}

// Update AI player
function updateAI() {
  const aiPlayer = players[1];

  // AI movement
  if (aiPlayer.x + PLAYER_SIZE / 2 < ball.x + BALL_SIZE / 2) {
    aiPlayer.speedX = PLAYER_SPEED;
  } else {
    aiPlayer.speedX = -PLAYER_SPEED;
  }

  if (aiPlayer.y + PLAYER_SIZE / 2 < ball.y + BALL_SIZE / 2) {
    aiPlayer.speedY = PLAYER_SPEED;
  } else {
    aiPlayer.speedY = -PLAYER_SPEED;
  }

  // AI shooting
  const randomShot = Math.random() < 0.01; // Random chance to shoot
  if (randomShot && !aiPlayer.shooting) {
    aiPlayer.shooting = true;
  } else if (!randomShot && aiPlayer.shooting) {
    aiPlayer.shooting = false;
  }
}

// Check for scoring
function checkScoring() {
  if (players[0].shooting && !players[1].shooting && ball.x >= WIDTH - BALL_SIZE) {
    // Player 1 scores
    players[0].score++;
    resetPositions();
  } else if (!players[0].shooting && players[1].shooting && ball.x <= 0) {
    // Player 2 (AI) scores
    players[1].score++;
    resetPositions();
  }
}

// Reset player and ball positions
function resetPositions() {
  players[0].x = 100;
  players[0].y = HEIGHT / 2 - PLAYER_SIZE / 2;
  players[0].speedX = 0;
  players[0].speedY = 0;
  players[0].shooting = false;

  players[1].x = WIDTH - 100 - PLAYER_SIZE;
  players[1].y = HEIGHT / 2 - PLAYER_SIZE / 2;
  players[1].speedX = 0;
  players[1].speedY = 0;
  players[1].shooting = false;

  ball.x = WIDTH / 2 - BALL_SIZE / 2;
  ball.y = HEIGHT / 2 - BALL_SIZE / 2;

  shotClock = SHOT_CLOCK;
}

// Render game objects
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw players and ball
  players.forEach(player => player.draw());
  ball.draw();

  // Render game clock and shot clock
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.fillText(`Game Clock: ${gameClock.toFixed(1)}s`, 10, 30);
  ctx.fillText(`Shot Clock: ${shotClock.toFixed(1)}s`, 10, 60);

  // Render scores
  ctx.fillText(`Player 1: ${players[0].score}`, 10, HEIGHT - 30);
  ctx.fillText(`Player 2: ${players[1].score}`, 10, HEIGHT - 60);
}

// Game loop
function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

// Initialize the game
initialize();

// Start the game loop
gameLoop();
