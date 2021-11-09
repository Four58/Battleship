import { Fragment } from "react";
import Counter from "./game/counter/Counter";
import Game from "./game/Game";
import { Prompt } from "react-router-dom";
import Chat from "./chat/Chat";
import GameHeader from "../Header/GameHeader";

const Main = (props) => {
  const showMessage = () => {
    console.log("hi");
  };

  return (
    <Fragment>
      <GameHeader />
      <Prompt
        when={true}
        message="Are you sure you want to leave?"
        onConfirm={showMessage}
      />
      <Counter click={props.click} reset={props.setClicked} />
      <Game />
      <Chat
        socketId={props.socketId}
        inData={props.inData}
        setOutData={props.setOutData}
      />
    </Fragment>
  );
};

export default Main;
