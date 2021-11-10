import { useState, useEffect, useContext, useCallback } from "react";
import CreateRoom from "./CreateRoom";
import GameRoom from "./GameRoom";
import LobHeader from "./LobHeader";
import { SocketContext } from "../../../context/socket";

const LEAVE_ROOM_EVENT = "leaveRoom";
const FETCH_ROOM_EVENT = "fetchRoom";

const Lobby = () => {
  const socket = useContext(SocketContext);
  const [gameRooms, setGameRooms] = useState([]);

  const handleFetchRoom = useCallback((rooms) => {
    setGameRooms(rooms);
  }, []);

  useEffect(() => {
    socket.emit(LEAVE_ROOM_EVENT);

    socket.on(FETCH_ROOM_EVENT, handleFetchRoom);

    return () => {
      socket.off(FETCH_ROOM_EVENT, handleFetchRoom);
    };
  }, [socket, handleFetchRoom]);

  return (
    <div>
      <LobHeader />
      <main>
        <CreateRoom />
        <GameRoom rooms={gameRooms} />
      </main>
    </div>
  );
};

export default Lobby;
