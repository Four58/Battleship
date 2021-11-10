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
const CREATE_ROOM_EVENT = "createRoom";
const LEAVE_ROOM_EVENT = "leaveRoom";
const FETCH_ROOM_EVENT = "fetchRoom";
const JOIN_ROOM_EVENT = "joinRoom";
const rooms = {};

io.on("connection", (socket) => {
  // Join a conversation
  // const { roomId } = socket.handshake.query;
  let socketRoomId, socketUsername;
  console.log(socket.id + " joins the server");

  socket.on(SEND_USERNAME_EVENT, ({ username }) => {
    // console.log(`${socket.id} is ${username}`);
    socketUsername = username;
    socket.joinGame = false;
  });

  socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
    if(!socket.joinGame) {
      return;
    }
    console.log("chat incoming", message);
    io.in(socketRoomId).emit(NEW_CHAT_MESSAGE_EVENT, {...message, sender: socketUsername });
  });

  socket.on(CREATE_ROOM_EVENT, ({ roomId, roomName, description }) => {
    if(socket.joinGame) {
      return;
    }
    socket.joinGame = true;
    socketRoomId = roomId;
    socket.join(socketRoomId);
    rooms[socketRoomId] = {
      roomName,
      description,
      users: { [socket.id]: socketUsername },
      messages: [],
    };
    socket.emit(JOIN_ROOM_EVENT, rooms[socketRoomId]);
    console.log("create room", rooms);
  });

  socket.on(JOIN_ROOM_EVENT, ({ username, roomId }) => {
    if(socket.joinGame) {
      return;
    }
    socket.joinGame = true;
    socketRoomId = roomId;
    socket.join(socketRoomId);
    rooms[socketRoomId].users[socket.id] = username;
    io.in(socketRoomId).emit(JOIN_ROOM_EVENT, rooms[socketRoomId]);
  });

  socket.on(LEAVE_ROOM_EVENT, () => {
    if(!socket.joinGame) {
      return;
    }
    console.log(`${socket.id} leaves room #${socketRoomId}`);
    if(Object.keys(rooms[socketRoomId].users).length === 1) {
      console.log(`Delete room #${socketRoomId}`);
      delete rooms[socketRoomId];
    } else {
      delete rooms[socketRoomId].users[socket.id];
    }
    socket.joinGame = false;
    delete socketRoomId;
    io.emit(FETCH_ROOM_EVENT, rooms);
  });
});

io.listen(PORT);
