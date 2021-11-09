import { useEffect } from "react";
import CreateRoom from "./CreateRoom";
import GameRoom from "./GameRoom";
import LobHeader from "./LobHeader";
import useRoom from "../../../hooks/useRoom";

const Lobby = (props) => {
  const [rooms, joinRoom, createRoom, leaveRoom] = useRoom(
    props.inData,
    props.setOutData
  );

  useEffect(() => {
    leaveRoom();
  }, [leaveRoom]);

  return (
    <div>
      <LobHeader />
      <main>
        <CreateRoom createRoom={createRoom} />
        <GameRoom rooms={rooms} joinRoom={joinRoom} />
      </main>
    </div>
  );
};

export default Lobby;
