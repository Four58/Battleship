import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setName } from "../../store/enemy-slice";
import useSocket from "./useSocket";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SEND_USERNAME_EVENT = "sendUsernane";
const ESTABLISH_CONNECTION = "establishConnection";


const useChat = (username, roomId) => {
  const [inData, setOutData] = useSocket(roomId);
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketId = useRef();
  const dispatch = useDispatch();

  const sendUsername = useCallback(() => {
    if(username !== '') {
      setOutData({ eventName: SEND_USERNAME_EVENT, data: { username } });
    }
  }, [username])

  useEffect(() => {
    console.log(inData);
    switch(inData['eventName']) {
      case ESTABLISH_CONNECTION:
        socketId.current = inData['data']['socketId'];
        sendUsername();
        break;

      case SEND_USERNAME_EVENT:
        const enemyId = Object.keys(inData['data']).find(userId => userId !== socketId.current);
        if (enemyId !== undefined) {
            // console.log(inData['data'][String(enemyId)]);
            dispatch(setName({ username: inData['data'][String(enemyId)] }));
        }
        break;

      case NEW_CHAT_MESSAGE_EVENT:
        const incomingMessage = {
          ...inData['data'],
          ownedByCurrentUser: inData['data'].senderId === socketId.current,
        };
        setMessages((messages) => [...messages, incomingMessage]);
        break;

      default:
        break;
    }

    return (() => {
      dispatch(clearUser());
    });
    
  }, [dispatch, inData]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    setOutData({
      eventName: NEW_CHAT_MESSAGE_EVENT,
      data: {
        body: messageBody,
        sender: username,
        senderId: socketId.current,
      }
    });
  };

  return [ messages, sendMessage ];
};

export default useChat;