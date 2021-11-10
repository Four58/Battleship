import { useState, useContext, useCallback } from "react";
import classes from "./CreateRoom.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/";
import { v4 as uuidv4 } from "uuid";
import { exitActions } from "../../../store/exitSlice";
import useInput from "../../../hooks/useInput";
import { logActions } from "../../../store/logSlice";
import { SocketContext } from "../../../context/socket";

//join link with room id
const CREATE_ROOM_EVENT = "createRoom";

const CreateRoom = (props) => {
  const socket = useContext(SocketContext);
  const roomId = uuidv4();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const notEmpty = (item) => item.trim() !== "";
  const {
    value: roomName,
    valid: roomNameValid,
    touchInvalid: roomNameTouchInvalid,
    onChangeHandler: roomNameChangeHandler,
    onBlurHandler: roomNameBlurHandler,
  } = useInput(notEmpty);

  //const { roomId, roomName, description, userId, username }
  const handleCreateRoom = useCallback(() => {
    socket.emit(CREATE_ROOM_EVENT, {
      roomId,
      roomName,
      description,
    });
  }, [socket, roomId, roomName, description]);

  const onCreateGameHandler = () => {
    handleCreateRoom();
    dispatch(exitActions.resetExit());
    dispatch(logActions.joinGame(roomId));
    console.log("created!");
  };

  const roomClasses = `${classes.control} ${
    roomNameTouchInvalid ? classes.invalid : ""
  }`;

  return (
    <section className={classes.summary}>
      <h2>Create room</h2>
      <div className={classes.actions}>
        <div className={roomClasses}>
          <label>Room Name:</label>
          <input
            value={roomName}
            onChange={roomNameChangeHandler}
            onBlur={roomNameBlurHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Description:</label>
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <Link to={`/game/${roomId}`}>
          <button
            disabled={!roomNameValid}
            type="button"
            className={classes.submit}
            onClick={onCreateGameHandler}
          >
            Create
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CreateRoom;
