import { useContext } from "react";
import classes from "./RoomItem.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "../../../store/logSlice";
import { SocketContext } from "../../../context/socket";

const JOIN_ROOM_EVENT = "joinRoom";

const RoomItem = (props) => {
  const socket = useContext(SocketContext);
  // const canJoin = useSelector((state) => state.game.joinAble);
  const userInfo = useSelector((state) => state.log);
  const dispatch = useDispatch();

  const joinRoom = () => {
    socket.emit(JOIN_ROOM_EVENT, {
      username: userInfo.username,
      roomId: props.room.roomId,
    });
    dispatch(logActions.joinGame(props.room.roomId));
  };

  return (
    <li className={classes.room}>
      <div>
        <h3>Room Name: {props.room.roomName}</h3>
        <div className={classes.description}>{props.room.description}</div>
        <div className={classes.id}>Room ID: {props.room.roomId}</div>
      </div>
      <div className={classes.actions}>
        <Link to={`/game/${props.room.roomId}`}>
          <button className={classes.button} onClick={joinRoom}>
            Join
          </button>
        </Link>
      </div>
    </li>
  );
};

export default RoomItem;
