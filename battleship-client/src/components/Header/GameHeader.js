import classes from "./GameHeader.module.css";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import Music from "../Header/Music";
import useAudio from "../../hooks/useAudio";
import niceMusic from "../../assets/battleship.mp3";

const GameHeader = () => {
  const [playing, setPlaying] = useAudio(niceMusic);
  // const dispatch = useDispatch();
  // const match = useRouteMatch();
  // console.log(match.params.roomId);

  return (
    <header className={classes.header}>
      <Music playing={playing} setPlaying={setPlaying} />
      <div className={classes.logo}>Let's play</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Leave game!
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GameHeader;
