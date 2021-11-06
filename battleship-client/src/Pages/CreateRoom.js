import classes from "./CreateRoom.module.css";

const CreateRoom = () => {
  return (
    <section className={classes.summary}>
      <h2>Create room</h2>
      <div className={classes.actions}>
        <div className={classes.control}>
          <label>Room Name:</label>
          <input />
        </div>
        <div className={classes.control}>
          <label>Description:</label>
          <input />
        </div>
        <button type="button" className={classes.submit}>
          Create
        </button>
      </div>
    </section>
  );
};

export default CreateRoom;
