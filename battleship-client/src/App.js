import BoardGame from "./components/BoardGame/BoardGame";
import LoginMenu from "./components/LoginMenu";
import React, { useEffect, useState } from "react";
import Counter from "./components/Counter/Counter";
import "./App.css";
import Ship from "./components/BoardGame/UserShip/Ship";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/log-slice";
import MainHeader from "./components/Header/MainHeader";

function App() {
  const [click, setClicked] = useState(false);
  const log = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginInfo = localStorage.getItem("isLoggedIn");

    if (loginInfo === "1") {
      dispatch(logActions.onLogged());
    }
  }, [dispatch]);

  return (
    <div>
      {!log.login && <LoginMenu />}
      <MainHeader />
      <h2>BattleShip game</h2>
      <h3 id="username">Username: {log.username}</h3>
      <Counter start={log.login} click={click} Reset={setClicked} />
      <div className="board-container">
        <BoardGame player="user" userClick={setClicked} />
        <BoardGame player="enemy" />
        <Ship />
      </div>
    </div>
  );
}

export default App;
