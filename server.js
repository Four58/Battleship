import { Server } from "socket.io";

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
const LEAVE_ROOM_EVENT = "leaveRoom"
const FETCH_ROOM_EVENT = "fetchRoom";
const JOIN_ROOM_EVENT = "joinRoom";
const rooms = {};

io.on("connection", (socket) => {
  // Join a conversation
  // const { roomId } = socket.handshake.query;
  let globalRoomId;
  socket.emit(ESTABLISH_CONNECTION, { socketId: socket.id });
  console.log(socket.id + " joins the server");
  socket.joinGame = false;

  // Fetch rooms
  socket.on(FETCH_ROOM_EVENT, () => {
    socket.emit(FETCH_ROOM_EVENT, { rooms });
  });

  socket.on(CREATE_ROOM_EVENT, ({ roomData }) => {
    socket.joinGame = true;
    globalRoomId = roomData['roomId'];
    socket.join(globalRoomId);
    rooms[globalRoomId] = {
      ...roomData,
      users: { [socket.id]: roomData['users']}
    };
    console.log(`${socket.id} create room #${globalRoomId}`);
    console.log(rooms);
    socket.emit(FETCH_ROOM_EVENT, { rooms });
  });

  // Join a room
  socket.on(JOIN_ROOM_EVENT, ({ roomId, username }) => {
    if(socket.joinGame) {
      return;
    }
    socket.joinGame = true;
    globalRoomId = roomId
    socket.join(globalRoomId);
    rooms[globalRoomId] = {
      ...rooms[globalRoomId],
      users: { ...rooms[globalRoomId]['users'], [socket.id]: username },
    };
    console.log(`${socket.id} join room #${globalRoomId}`);
    console.log(rooms);
    io.in(globalRoomId).emit(SEND_USERNAME_EVENT, rooms[globalRoomId]);
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    if (!socket.joinGame) {
      return;
    }
    io.in(globalRoomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on(LEAVE_ROOM_EVENT, () => {
    if(!socket.joinGame) {
      return;
    }
    console.log(`${socket.id} leaves room #${globalRoomId}`);
    if(Object.keys(rooms[globalRoomId]).length === 1) {
      console.log(`Delete room #${globalRoomId}`)
      delete rooms[globalRoomId];
      io.emit(FETCH_ROOM_EVENT, rooms);
    } else {
      socket.emit(FETCH_ROOM_EVENT, rooms);
    }
    globalRoomId = undefined;
    socket.joinGame = false;
  })

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(socket.id + " leaves the server");
    if(socket.joinGame && Object.keys(rooms[globalRoomId]).length === 1) {
      console.log(`Delete room #${globalRoomId}`)
      delete rooms[globalRoomId];
      io.emit(FETCH_ROOM_EVENT, rooms);
    }
  });
});

io.listen(PORT);
