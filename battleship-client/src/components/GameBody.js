import { Fragment } from "react";
import Counter from "./mainbody/game/counter/Counter";
import Game from "./mainbody/game/Game";
import Placeholder from "./mainbody/game/boardcontainer/board/Placeholder";
import Chat from "./mainbody/chat/Chat";
import { useRouteMatch } from "react-router-dom";

const GameBody = (props) => {
  const roomId = useRouteMatch().params.roomId;
  // console.log(roomId);

  return (
    <Fragment>
      <Counter click={props.click} reset={props.setClicked} />
      <Game />
      <Placeholder />
      <Chat
        roomId={roomId}
        inData={props.inData}
        setOutData={props.setOutData}
      />
    </Fragment>
  );
};

export default GameBody;
