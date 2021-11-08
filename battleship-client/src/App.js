import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/logSlice";
import LoginMenu from "./components/LoginMenu";
import MainHeader from "./components/Header/MainHeader";
import Lobby from "./pages/Lobby";
import { Route, Switch, Redirect } from "react-router-dom";
import useSocket from "./components/hooks/useSocket";
import NotFound from "./pages/NotFound";
import Credit from "./pages/Extra/Credit";
import GameBody from "./components/GameBody";

function App() {
  const [inData, setOutData] = useSocket();
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
          <Route path="/" exact>
            <Redirect to="/lobby" />
          </Route>
          <Route path="/lobby">
            <Lobby inData={inData} setOutData={setOutData} />
          </Route>
          <Route path="/game/:roomId" exact>
            <GameBody
              click={click}
              setClicked={setClicked}
              inData={inData}
              setOutData={setOutData}
            />
          </Route>
          <Route path="/credit">
            <Credit />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
