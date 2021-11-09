import { useState } from "react";
import classes from "./CreateRoom.module.css";
import { gameActions } from "../../../store/gameSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//join link with room id

const CreateRoom = (props) => {
  const roomId = uuidv4();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const userInfo = useSelector((state) => state.log);

  const onCreateGameHandler = () => {
    const roomData = {
      roomId,
      roomName,
      description,
      users: userInfo['username']
    }
    props.createRoom(roomData)
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
        <Link to={`/${roomId}`}>
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
