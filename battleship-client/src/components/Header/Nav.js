import { useDispatch } from "react-redux";
import { logActions } from "../../store/log-slice";
import classes from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logActions.onLogout());
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/">Lobby</a>
        </li>
        <li>
          <button onClick={onLogoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
