import { useState } from "react";
import classes from "./CreateRoom.module.css";
import { gameActions } from "../store/gameSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//join link with room id

const CreateRoom = () => {
  const roomId = uuidv4();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.log);
  // const roomIdExist = useSelector((state) => state.game.room);

  const onCreateGameHandler = () => {
    // setRoomId(uuidv4());
    // console.log(roomId);
    dispatch(
      gameActions.createGame({
        roomId,
        roomName,
        description,
        userId: userInfo.userId,
        username: userInfo.username,
      })
    );
  };

  return (
    <section className={classes.summary}>
      <h2>Create room</h2>
      <div className={classes.actions}>
        <div className={classes.control}>
          <label>Room Name:</label>
          <input
            value={roomName}
            onChange={({ target }) => setRoomName(target.value)}
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
