import classes from "./RoomItem.module.css";
import { Link } from "react-router-dom";

const RoomItem = (props) => {
  return (
    <li className={classes.room}>
      <div>
        <h3>Room Name: {props.roomName}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.id}>Room ID: {props.roomId}</div>
      </div>
      <div className={classes.actions}>
        <Link to={`/${props.roomId}`}>
          <button className={classes.button}>Join</button>
        </Link>
      </div>
    </li>
  );
};

export default RoomItem;
