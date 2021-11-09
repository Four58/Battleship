import { Fragment } from "react";
import Counter from "./game/counter/Counter";
import Game from "./game/Game";
import { useParams } from "react-router-dom";
import Chat from "./chat/Chat";

const Main = (props) => {
  const roomId = useParams().roomId;
  
  return (
    <>
      <Counter click={props.click} reset={props.setClicked} />
      <Game />
      <Chat
        socketId={props.socketId}
        inData={props.inData}
        setOutData={props.setOutData}
      />
    </>
  );
};

export default Main;
