import Card from "../../UI/Card";
import RoomItem from "./RoomItem";

const GameRoom = (props) => {
  return (
    <section>
      <Card>
        <ul>
          {props.rooms === {}
            ? []
            : Object.keys(props.rooms).map((roomId, index) => (
                <RoomItem key={index} room={props.room[roomId]} />
              ))}
        </ul>
      </Card>
    </section>
  );
};

export default GameRoom;
