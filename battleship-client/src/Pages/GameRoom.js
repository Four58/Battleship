import Card from "../components/UI/Card";
import RoomItem from "./RoomItem";
import { useSelector } from "react-redux";

const GameRoom = () => {
  const gameRoom = useSelector((state) => state.game.room);
  console.log(gameRoom);

  const roomList = gameRoom
    .filter((item) => item.roomId !== undefined)
    .map((item, index) => (
      <RoomItem
        key={index}
        roomName={item.roomName}
        description={item.description}
        roomId={item.roomId}
      />
    ));

  return (
    <section>
      <Card>
        <ul>{roomList}</ul>
      </Card>
    </section>
  );
};

export default GameRoom;
