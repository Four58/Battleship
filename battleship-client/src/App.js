import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/logSlice";
import { Route, Switch } from "react-router-dom";
import useSocket from "./hooks/useSocket";
import NotFound from "./NotFound";
import Credit from "./components/main/credit/Credit";
import Instruction from "./components/main/Instruction/Instruction";
import LoginMenu from "./components/LoginMenu";
import Lobby from "./components/main/lobby/Lobby";
import MainHeader from "./components/Header/MainHeader";
import Main from "./components/main/Main";

function App() {
  const [inData, setOutData, socketId] = useSocket();
  const [click, setClicked] = useState(false);
  const log = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginInfo = localStorage.getItem("isLoggedIn");

    if (loginInfo === "1") {
      dispatch(logActions.onLogged());
    }
  }, [dispatch]);

  useEffect(() => {
    if (log.userJoin) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [log.userJoin]);

  return (
    <>
      {!log.login && <LoginMenu />}
      <MainHeader />
      <Switch>
        <Route exact path="/">
          <Lobby inData={inData} setOutData={setOutData} />
        </Route>
        <Route path="/instruction">
          <Instruction />
        </Route>
        <Route path="/credit">
          <Credit />
        </Route>
        <Route path="/game/:roomId">
          <Main
            click={click}
            setClicked={setClicked}
            inData={inData}
            setOutData={setOutData}
            socketId={socketId}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
