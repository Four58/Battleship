const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const ESTABLISH_CONNECTION = "establishConnection";
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SEND_USERNAME_EVENT = "sendUsernane";
const JOIN_ROOM = "joinRoom";
const FETCH_ROOM = "fetchRoom";
const room = {};

io.on("connection", (socket) => {
  // Join a conversation
  // const { roomId } = socket.handshake.query;
  let globalRoomId;
  socket.emit(ESTABLISH_CONNECTION, { socketId: socket.id });
  console.log(socket.id + " joins the server");
  socket.joinGame = false;

  // Fetch rooms
  socket.on(FETCH_ROOM, () => {
    socket.emit(FETCH_ROOM, room);
  });

  // Join a room
  socket.on(JOIN_ROOM, ({ roomId, username }) => {
    console.log(`${socket.id} joining ${roomId}`);
    socket.joinGame = true;
    globalRoomId = roomId;
    socket.join(globalRoomId);
    room[globalRoomId] = {
      ...room[globalRoomId],
      [String(socket.id)]: username,
    };
    io.in(globalRoomId).emit(SEND_USERNAME_EVENT, room[roomId]);
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    if (!socket.joinGame) {
      return;
    }
    io.in(globalRoomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(socket.id + " leaves the server");
    if (socket.joinGame) {
      delete room[globalRoomId];
      socket.leave(globalRoomId);
    }
  });
});

io.listen(PORT);
