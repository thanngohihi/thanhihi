socket.on('join-room', (room) => {
  socket.join(room);
});

socket.on('start-game', ({ room, cards }) => {
  io.to(room).emit('start-game', cards);
});
