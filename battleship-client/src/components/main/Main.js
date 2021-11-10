import { Fragment } from "react";
import Counter from "./game/counter/Counter";
import { useState, useEffect, useContext, useCallback } from "react";
import Game from "./game/Game";
import Chat from "./chat/Chat";
import GameHeader from "../Header/GameHeader";
import { SocketContext } from "../../context/socket";

const JOIN_ROOM_EVENT = "joinRoom";
// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const Main = (props) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  const handleJoinRoom = useCallback(
    (roomData) => {
      console.log("Messages setup");
      const newMessages = roomData.messages.map((message) => {
        return {
          ...message,
          ownedByCurrentUser: socket.id === message.senderId,
        };
      });
      setMessages(newMessages);
    },
    [socket.id]
  );

  useEffect(() => {
    socket.on(JOIN_ROOM_EVENT, handleJoinRoom);

    return () => {
      socket.off(JOIN_ROOM_EVENT, handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <Fragment>
      <GameHeader />
      <Counter click={props.click} reset={props.setClicked} />
      <Game />
      <Chat messages={messages} setMessages={setMessages} />
    </Fragment>
  );
};

export default Main;
