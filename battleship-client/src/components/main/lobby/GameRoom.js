import Card from "../../UI/Card";
import RoomItem from "./RoomItem";

const GameRoom = (props) => {
  const gameRoom = props.rooms;

  const roomList =
    gameRoom !== {}
      ? Object.keys(gameRoom).map((key, index) => (
          <RoomItem
            key={index}
            roomName={gameRoom[key].roomName}
            description={gameRoom[key].description}
            roomId={key}
            joinRoom={props.joinRoom}
          />
        ))
      : [];

  return (
    <section>
      <Card>
        <ul>{roomList}</ul>
      </Card>
    </section>
  );
};

export default GameRoom;
