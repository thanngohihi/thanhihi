function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function displayRoomCode(code) {
  document.getElementById("room-code").textContent = "🔑 Mã phòng: " + code;
}

function createCards(count = 6) {
  const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓'];
  let selected = icons.slice(0, count);
  let cards = [...selected, ...selected];
  cards = cards.sort(() => 0.5 - Math.random());

  const board = document.getElementById("game-board");
  board.innerHTML = "";
  cards.forEach((icon, idx) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.innerHTML = `<span class="front">❓</span><span class="back">${icon}</span>`;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

let flippedCards = [];

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.icon === second.dataset.icon) {
      flippedCards = [];
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function startSingle() {
  hideMenus();
  createCards();
}

function createRoom() {
  const roomCode = generateRoomCode();
  hideMenus();
  displayRoomCode(roomCode);
  createCards();
  // socket.io logic here nếu dùng
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
  createCards();
  // socket.io logic here nếu dùng
}

function hideMenus() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("room-form").style.display = "none";
}

function goHome() {
  window.location.href = "/trangchinh/index.html";
}

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const autoMode = urlParams.get("mode");
  const roomCode = urlParams.get("room");

  if (autoMode === "multi" && roomCode) {
    hideMenus();
    displayRoomCode(roomCode);
    createCards();
  }
};
