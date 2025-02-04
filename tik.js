const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('reset-btn');
const scoreElement = document.getElementById('score');

const gridSize = 20;
let snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
let direction = { x: 0, y: 0 };
let food = { x: 5 * gridSize, y: 5 * gridSize };
let score = 0;
let gameInterval;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreElement.textContent = 'Score: ' + score;
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();

    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over! Final Score: ' + score);
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
}

function startGame() {
    score = 0;
    scoreElement.textContent = 'Score: ' + score;
    snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
    direction = { x: 0, y: 0 };
    spawnFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
}

document.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', startGame);

// Start the game when the page loads
startGame();



// let currentPlayer = "X";
// let gameBoard = ["", "", "", "", "", "", "", "", ""];
// let gameActive = true;

// const board = document.getElementById("board");
// const resetBtn = document.getElementById("reset-btn");

// // Create board cells dynamically
// for (let i = 0; i < 9; i++) {
//     const cell = document.createElement("div");
//     cell.dataset.index = i;
//     cell.addEventListener("click", handleCellClick);
//     board.appendChild(cell);
// }

// // Handle cell click
// function handleCellClick(e) {
//     const index = e.target.dataset.index;

//     if (gameBoard[index] !== "" || !gameActive) return;

//     gameBoard[index] = currentPlayer;
//     e.target.textContent = currentPlayer;

//     if (checkWinner()) {
//         setTimeout(() => {
//             alert(`${currentPlayer} wins!`);
//         }, 100);
//         gameActive = false;
//         return;
//     }

//     // Check for a draw
//     if (!gameBoard.includes("")) {
//         setTimeout(() => {
//             alert("It's a draw!");
//         }, 100);
//         gameActive = false;
//         return;
//     }

//     // Switch player
//     currentPlayer = currentPlayer === "X" ? "O" : "X";
// }

// // Check for winner
// function checkWinner() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     return winPatterns.some(pattern => {
//         const [a, b, c] = pattern;
//         return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
//     });
// }

// // Reset game
// resetBtn.addEventListener("click", () => {
//     gameBoard = ["", "", "", "", "", "", "", "", ""];
//     currentPlayer = "X";
//     gameActive = true;

//     const cells = document.querySelectorAll(".board div");
//     cells.forEach(cell => {
//         cell.textContent = "";
//     });
// });

