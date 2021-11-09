import { useDispatch } from "react-redux";
import { logActions } from "../../store/logSlice";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const RoomNav = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logActions.onLogout());
  };

  // const exitPress = () => {
  //   dispatch(exitActions.isExit());
  //   console.log("kuay");
  // };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Lobby
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/instruction"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
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

export default RoomNav;
