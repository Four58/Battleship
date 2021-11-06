import CreateRoom from "./CreateRoom";
import GameRoom from "./GameRoom";
import LobHeader from "./LobHeader";

const Lobby = () => {
  return (
    <div>
      <LobHeader />
      <main>
        <CreateRoom />
        <GameRoom />
      </main>
    </div>
  );
};

export default Lobby;
