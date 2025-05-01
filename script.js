const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let score = 0;
const coinCount = 5;
let coinsCollected = 0;

// Initialize player position
let playerX = 100;
let playerY = 100;
player.style.left = `${playerX}px`;
player.style.top = `${playerY}px`;

// Create enemies
const enemies = [];
for (let i = 0; i < 3; i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    enemy.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
    gameContainer.appendChild(enemy);
    enemies.push(enemy);
}

// Create coins
for (let i = 0; i < coinCount; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
    coin.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
    gameContainer.appendChild(coin);
}

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
    const speed = 10;
    switch (e.key) {
        case 'ArrowUp':
            playerY = Math.max(playerY - speed, 0);
            break;
        case 'ArrowDown':
            playerY = Math.min(playerY + speed, window.innerHeight - 30);
            break;
        case 'ArrowLeft':
            playerX = Math.max(playerX - speed, 0);
            break;
        case 'ArrowRight':
            playerX = Math.min(playerX + speed, window.innerWidth - 30);
            break;
    }
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    checkCollisions();
});

// Check for collisions with coins or enemies
function checkCollisions() {
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        if (isColliding(player, coin)) {
            coin.remove();
            score += 10;
            coinsCollected++;
            scoreDisplay.textContent = `Score: ${score}`;
            if (coinsCollected === coinCount) {
                alert('You win!');
                resetGame();
            }
        }
    });

    enemies.forEach(enemy => {
        if (isColliding(player, enemy)) {
            alert('Game Over!');
            resetGame();
        }
    });
}

// Check if two elements are colliding
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// Move enemies randomly
function moveEnemies() {
    enemies.forEach(enemy => {
        const dx = (Math.random() - 0.5) * 100;
        const dy = (Math.random() - 0.5) * 100;
        let newX = parseFloat(enemy.style.left) + dx;
        let newY = parseFloat(enemy.style.top) + dy;

        newX = Math.max(0, Math.min(newX, window.innerWidth - 30));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 30));

        enemy.style.left = `${newX}px`;
        enemy.style.top = `${newY}px`;
    });
    requestAnimationFrame(moveEnemies);
}

// Reset the game
function resetGame() {
    score = 0;
    coinsCollected = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    playerX = 100;
    playerY = 100;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // Reset coins
    gameContainer.querySelectorAll('.coin').forEach(coin => coin.remove());
    for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        coin.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
        gameContainer.appendChild(coin);
    }

    // Reset enemies
    enemies.forEach(enemy => {
        enemy.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
        enemy.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
    });
}

// Start enemy movement
moveEnemies();