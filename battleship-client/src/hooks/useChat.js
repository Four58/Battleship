import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setName } from "../store/enemySlice";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SEND_USERNAME_EVENT = "sendUsernane";

const useChat = (username, socketId, inData, setOutData) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const dispatch = useDispatch();

  useEffect(() => {
    switch (inData["eventName"]) {
      case SEND_USERNAME_EVENT:
        const enemyId = Object.keys(inData["data"]).find(
          (userId) => userId !== socketId
        );
        if (enemyId !== undefined) {
          dispatch(setName({ username: inData["data"][String(enemyId)] }));
        }
        break;

      case NEW_CHAT_MESSAGE_EVENT:
        console.log(inData);
        const incomingMessage = {
          ...inData["data"],
          ownedByCurrentUser: inData["data"].senderId === socketId,
        };
        setMessages((messages) => [...messages, incomingMessage]);
        break;

      default:
        break;
    }

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, inData, socketId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    setOutData({
      eventName: NEW_CHAT_MESSAGE_EVENT,
      data: {
        body: messageBody,
        sender: username,
        senderId: socketId.current,
      },
    });
  };

  return [messages, sendMessage];
};

export default useChat;
