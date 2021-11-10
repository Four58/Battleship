import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logActions } from "./store/logSlice";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginMenu from "./components/LoginMenu";
import MainHeader from "./components/Header/MainHeader";
import { socket, SocketContext } from "./context/socket";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Main = React.lazy(() => import("./components/main/Main"));
const Credit = React.lazy(() => import("./components/main/credit/Credit"));
const Instruction = React.lazy(() =>
  import("./components/main/Instruction/Instruction")
);
const Admin = React.lazy(() => import("./admin/Admin"));
const NotFound = React.lazy(() => import("./NotFound"));
const Lobby = React.lazy(() => import("./components/main/lobby/Lobby"));

const SEND_USERNAME_EVENT = "sendUsernane";

function App() {
  const history = useHistory();
  const [click, setClicked] = useState(false);
  const log = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginInfo = localStorage.getItem("isLoggedIn");

    if (loginInfo === "1") {
      console.log("sending username");
      const username = localStorage.getItem("username");
      socket.emit(SEND_USERNAME_EVENT, { username });
      dispatch(logActions.onLogged());
    }
  }, [dispatch]);

  const backToLobby = () => {
    history.replace("/");
  };

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
    <SocketContext.Provider value={socket}>
      {!log.login && <LoginMenu />}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <MainHeader />
            <Lobby />
          </Route>
          <Route path="/instruction">
            <MainHeader />
            <Instruction />
          </Route>
          <Route path="/credit">
            <MainHeader />
            <Credit />
          </Route>
          <Route path="/game/:roomId">
            <Main click={click} setClicked={setClicked} />
          </Route>
          <Route path="/admin" exact>
            <MainHeader />
            <Admin />
          </Route>
          <Route path="*">
            <MainHeader />
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </SocketContext.Provider>
  );
}

export default App;
