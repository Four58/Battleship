import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import { setName, clearUser } from "../../store/enemy-slice";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SEND_USERNAME_EVENT = "sendUsernane";
const ESTABLISH_CONNECTION = "establishConnection";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (username, roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(SEND_USERNAME_EVENT, (data) => {
       const enemyId = Object.keys(data).find(userId => userId !== socketRef.current.id);
       if (enemyId !== undefined) {
          console.log(data[String(enemyId)]);
          dispatch(setName({ username: data[String(enemyId)] }));
       }
    })  

    socketRef.current.on(ESTABLISH_CONNECTION, () => {
        while(username === "") {
            continue;
        }
        socketRef.current.emit(SEND_USERNAME_EVENT, {
            username: username
        })
    })
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
      dispatch(clearUser());
    };
  }, [username, roomId, dispatch]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      sender: username,
      senderId: socketRef.current.id,
    });
  };

  return [ messages, sendMessage ];
};

export default useChat;