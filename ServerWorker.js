function ServerWorker(io, socket) {
    let socketRoomId, socketUsername;
    //console.log(socket.id + " joins the server");
    socket.emit(ESTABLISH_CONNECTION);

    socket.on(SEND_USERNAME_EVENT, ({ username }) => {
        //console.log(`${socket.id} is ${username}`);
        socketUsername = username;
        socket.joinGame = false;
    });

    socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        if(!socket.joinGame) {
            return;
        }
        //console.log("chat incoming", message);
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
        roomId,
        roomName,
        description,
        users: { [socket.id]: socketUsername },
        messages: [],
        };
        socket.emit(JOIN_ROOM_EVENT, rooms[socketRoomId]);
        //console.log("create room", rooms);
        socket.broadcast.emit(FETCH_ROOM_EVENT, rooms);
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
        socket.broadcast.emit(FETCH_ROOM_EVENT, rooms);
    });

    socket.on(LEAVE_ROOM_EVENT, () => {
        if(!socket.joinGame) {
            socket.emit(FETCH_ROOM_EVENT, rooms);
            return;
        }
        //console.log(`${socket.id} leaves room #${socketRoomId}`);
        if(Object.keys(rooms[socketRoomId].users).length === 1) {
        //console.log(`Delete room #${socketRoomId}`);
        delete rooms[socketRoomId];
        } else {
        delete rooms[socketRoomId].users[socket.id];
        }
        socket.joinGame = false;
        delete socketRoomId;
        io.emit(FETCH_ROOM_EVENT, rooms);
    });
}

export default ServerWorker;
