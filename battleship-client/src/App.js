import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/log-slice";
import Counter from "./components/mainbody/game/counter/Counter";
import LoginMenu from "./components/LoginMenu";
import MainHeader from "./components/Header/MainHeader";
import Game from "./components/mainbody/game/Game";
import Chat from "./components/mainbody/chat/Chat";
import Lobby from "./Pages/Lobby";
import { Route, Switch } from "react-router-dom";

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
      <main>
        <Switch>
          <Route path="/game" exact>
            <h2>BattleShip game</h2>
            {/* <h3 id="username">Username: {log.username}</h3> */}
            <Counter start={log.login} click={click} Reset={setClicked} />
            <Game />
            <Chat roomId="566932" />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
