import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/logSlice";
import LoginMenu from "./components/LoginMenu";
import MainHeader from "./components/header/MainHeader";
import Lobby from "./components/main/lobby/Lobby";
import { Route, Routes } from "react-router-dom";
import useSocket from "./hooks/useSocket";
import NotFound from "./NotFound";
import Credit from "./components/main/credit/Credit";
import GameBody from "./components/main/Main";


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

  return (
    <div>
      {!log.login && <LoginMenu />}
      <MainHeader />
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<Lobby inData={inData} setOutData={setOutData} />} />
            <Route path=":roomId" exact element={
              <GameBody
                click={click}
                setClicked={setClicked}
                inData={inData}
                setOutData={setOutData}
                socketId={socketId}
              />} />
          </Route>
          <Route path="/credit" element={ <Credit /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
