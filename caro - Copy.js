let currentPlayer = 'X';
let board = [];
let gameOver = false;

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function displayRoomCode(code) {
  document.getElementById("room-code").textContent = "🔑 Mã phòng: " + code;
}

function startSingle() {
  hideMenus();
  createBoard();
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  board = Array(10).fill().map(() => Array(10).fill(''));
  gameOver = false;
  currentPlayer = 'X';
  updateStatus();

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.onclick = () => handleClick(x, y, cell);
      gameBoard.appendChild(cell);
    }
  }
}

function handleClick(x, y, cell) {
  if (board[y][x] || gameOver) return;
  board[y][x] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(x, y)) {
    document.getElementById("status").textContent = `🎉 Người chơi ${currentPlayer} thắng!`;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin(x, y) {
  const symbol = board[y][x];
  const directions = [
    [[1, 0], [-1, 0]],
    [[0, 1], [0, -1]],
    [[1, 1], [-1, -1]],
    [[1, -1], [-1, 1]]
  ];

  for (const [[dx1, dy1], [dx2, dy2]] of directions) {
    let count = 1;

    for (let d of [[dx1, dy1], [dx2, dy2]]) {
      let nx = x, ny = y;
      while (true) {
        nx += d[0];
        ny += d[1];
        if (board[ny]?.[nx] === symbol) {
          count++;
        } else break;
      }
    }

    if (count >= 5) return true;
  }

  return false;
}

function updateStatus() {
  document.getElementById("status").textContent = `Lượt của: ${currentPlayer}`;
}

function createRoom() {
  const code = generateRoomCode();
  hideMenus();
  displayRoomCode(code);
  createBoard();
}

function showJoinForm() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("room-form").style.display = "block";
}

function joinRoom() {
  const code = document.getElementById("room-input").value.toUpperCase();
  if (code.trim() === "") return alert("Vui lòng nhập mã phòng!");
  hideMenus();
  displayRoomCode(code);
  createBoard();
}

function hideMenus() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("room-form").style.display = "none";
}

function goHome() {
  window.location.href = "/trangchinh/index.html";
}
