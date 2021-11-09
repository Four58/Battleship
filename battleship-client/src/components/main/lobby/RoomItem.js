import classes from "./RoomItem.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "../../../store/logSlice";

const RoomItem = (props) => {
  const canJoin = useSelector((state) => state.game.joinAble);
  const userInfo = useSelector((state) => state.log);
  const dispatch = useDispatch();

  const joinRoom = () => {
    props.joinRoom(props.roomId, userInfo.username);
    dispatch(logActions.joinGame(props.roomId));
  };

  return (
    <li className={classes.room}>
      <div>
        <h3>Room Name: {props.roomName}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.id}>Room ID: {props.roomId}</div>
      </div>
      <div className={classes.actions}>
        <Link to={`/game/${props.roomId}`}>
          <button className={classes.button} onClick={joinRoom}>
            Join
          </button>
        </Link>
      </div>
    </li>
  );
};

export default RoomItem;
