import { useState } from "react";
import classes from "./CreateRoom.module.css";
// import { gameActions } from "../../../store/gameSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { exitActions } from "../../../store/exitSlice";
import useInput from "../../../hooks/useInput";
import { logActions } from "../../../store/logSlice";

//join link with room id

const CreateRoom = (props) => {
  const roomId = uuidv4();
  const [description, setDescription] = useState("");
  const userInfo = useSelector((state) => state.log);
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

  const onCreateGameHandler = () => {
    const roomData = {
      roomId,
      roomName,
      description,
      users: userInfo["username"],
    };
    props.createRoom(roomData);
    dispatch(exitActions.resetExit());
    dispatch(logActions.joinGame(roomId));
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
