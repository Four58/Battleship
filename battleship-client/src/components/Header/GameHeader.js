import classes from "./GameHeader.module.css";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import Music from "../Header/Music";
import useAudio from "../../hooks/useAudio";
import niceMusic from "../../assets/battleship.mp3";
import Modal from "../UI/Modal";
import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { logActions } from "../../store/logSlice";
import { resetUserBoard } from "../../store/boardGenerate";

const GameHeader = () => {
  const [playing, setPlaying] = useAudio(niceMusic);
  const [leave, setLeave] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // const match = useRouteMatch();
  // console.log(match.params.roomId);

  const confirmHandler = () => {
    setLeave(false);
    dispatch(logActions.leftGame());
    //re-board here
    dispatch(resetUserBoard());
    history.replace("/");
  };

  const cancelHandler = () => {
    setLeave(false);
  };

  const leaveHandler = () => {
    setLeave(true);
  };

  const checkExit = (
    <Modal>
      <form>
        <h1>Are you sure you want to leave?</h1>
        <button onClick={cancelHandler}>cancel</button>
        <button onClick={confirmHandler}>confirm</button>
      </form>
    </Modal>
  );

  return (
    <Fragment>
      {leave && checkExit}
      <header className={classes.header}>
        <Music playing={playing} setPlaying={setPlaying} />
        <div className={classes.logo}>Let's play</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <button onClick={leaveHandler}>Leave game!</button>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default GameHeader;
