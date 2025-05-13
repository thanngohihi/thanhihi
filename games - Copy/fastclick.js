let score = 0;
let gameInterval;

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function displayRoomCode(code) {
  document.getElementById("room-code").textContent = "🔑 Mã phòng: " + code;
}

function startSingle() {
  hideMenus();
  startGame();
}

function createRoom() {
  const code = generateRoomCode();
  hideMenus();
  displayRoomCode(code);
  startGame();
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
  startGame();
}

function startGame() {
  score = 0;
  updateScore();
  clearInterval(gameInterval);
  spawnCircle();

  gameInterval = setInterval(() => {
    spawnCircle();
  }, 1000);
}

function spawnCircle() {
  const area = document.getElementById("game-area");
  area.innerHTML = "";

  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.top = Math.random() * 250 + "px";
  circle.style.left = Math.random() * 550 + "px";
  circle.onclick = () => {
    score++;
    updateScore();
    spawnCircle();
  };

  area.appendChild(circle);
}

function updateScore() {
  document.getElementById("score").textContent = "🔥 Điểm: " + score;
}

function hideMenus() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("room-form").style.display = "none";
}

function goHome() {
  window.location.href = "/trangchinh/index.html";
}
