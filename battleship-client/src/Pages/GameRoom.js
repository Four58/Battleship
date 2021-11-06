import Card from "../components/UI/Card";
import RoomItem from "./RoomItem";

const DUMMY_ROOM = [
  {
    roomname: "GG ez",
    decription: "Thailand only",
    roomId: 1,
  },
  {
    roomname: "JUST FOR FUN",
    decription: "chicken life matter",
    roomId: 2,
  },
  {
    roomname: "wanna lose",
    decription: "make me lose plz",
    roomId: 3,
  },
];

const GameRoom = () => {
  const roomList = DUMMY_ROOM.map((item) => (
    <RoomItem
      roomname={item.roomname}
      description={item.decription}
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
