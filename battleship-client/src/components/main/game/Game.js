import UserContainer from "./boardcontainer/UserContainer";
import EnemyContainer from "./boardcontainer/EnemyContainer";
import Modal from "../../UI/Modal";
import classes from "./Game.module.css";
import { Fragment, useState } from "react";

const Game = () => {
  const [gameEnd, setGameEnd] = useState(false);

  const onRestart = () => {};

  const onLeave = () => {};

  const endScreen = (
    <Fragment>
      <h1>Game End</h1>
      <div className={classes.actions}>
        <botton type="button" onClick={onLeave}>
          leave
        </botton>
        <button type="button" onClick={onRestart}>
          rematch
        </button>
      </div>
    </Fragment>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "baseline",
        marginBottom: "1vh",
      }}
    >
      {gameEnd && (
        <Modal>
          <div className={classes.form}>
            <form>{endScreen}</form>
          </div>
        </Modal>
      )}
      <UserContainer />
      <EnemyContainer />
    </div>
  );
};

export default Game;
