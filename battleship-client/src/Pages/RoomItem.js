import classes from "./RoomItem.module.css";

const RoomItem = (props) => {
  return (
    <li className={classes.room}>
      <div>
        <h3>Room Name: {props.roomname}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.id}>Room ID: {props.roomId}</div>
      </div>
      <div className={classes.actions}>
        <button className={classes.button}>Join</button>
      </div>
    </li>
  );
};

export default RoomItem;
