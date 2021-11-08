import { useDispatch } from "react-redux";
import { logActions } from "../../store/logSlice";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logActions.onLogout());
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/game">
              Game
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/lobby">
              Lobby
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/instruction">
              Instruction
            </NavLink>
          </li>
          <li>
            <button onClick={onLogoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
