const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const ESTABLISH_CONNECTION = "establishConnection";
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SEND_USERNAME_EVENT = "sendUsernane";
const room = {}

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.emit(ESTABLISH_CONNECTION, { socketId: socket.id });
  console.log(socket.id + " joins the server");

  socket.on(SEND_USERNAME_EVENT, (data) => {
    const { username } = data;
    room[roomId] = {...room[roomId], [String(socket.id)]: username };
    console.log(room[roomId])
    io.sockets.in(roomId).emit(SEND_USERNAME_EVENT, room[roomId]);
  })

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(socket.id + " leaves the server");
    delete room[roomId];
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});