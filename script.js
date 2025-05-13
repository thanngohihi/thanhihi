const playerName = localStorage.getItem('playerName') || 'Game thủ';
document.getElementById('player-name').textContent = playerName;

let selectedGame = '';

function playSingle(game) {
  window.location.href = `/games/${game}.html`;
}

function playMultiplayer(game) {
  selectedGame = game;
  document.getElementById('multiplayer-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('multiplayer-modal').classList.add('hidden');
}

function showJoinForm() {
  closeModal();
  document.getElementById('join-modal').classList.remove('hidden');
}

function closeJoinModal() {
  document.getElementById('join-modal').classList.add('hidden');
}

function createRoom() {
  const roomCode = Math.random().toString(36).substring(2, 8);
  window.location.href = `/games/${selectedGame}.html?room=${roomCode}&host=true`;
}

function joinRoom() {
  const roomCode = document.getElementById('room-code-input').value.trim();
  if (roomCode) {
    window.location.href = `/games/${selectedGame}.html?room=${roomCode}`;
  } else {
    alert("Vui lòng nhập mã phòng!");
  }
}
// Khi người tạo ấn "Chơi đôi"
function createRoomForMemory() {
  const roomCode = generateRoomCode();
  window.location.href = `memory.html?mode=multi&room=${roomCode}`;
}

