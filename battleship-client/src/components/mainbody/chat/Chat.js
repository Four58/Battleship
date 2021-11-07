import { useState } from "react";
import classes from "./Chat.module.css";
import { useSelector } from "react-redux";
import useChat from "../../hooks/useChat";


const Chat = (props) => {
  const username = useSelector((state) => state.log.username);
  const [messages, sendMessage] = useChat(username, props.roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className={classes.bodybox}>
      <div className={classes.chatborder}>
        <div>
          <h3>Chat</h3>
          {messages.map((message, i) => (
            <p key={i}>
              <span style={{color: message.ownedByCurrentUser ? "#1d9cb8" : "#b84b1d"}}>
                [{message.sender}] {}
              </span>
               {message.body}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            name="chat"
            id="chatbox"
            value={ newMessage }
            placeholder="Type something to the opponent"
            onChange={ event => setNewMessage(event.target.value) }
            style={{ width: "100%", minHeight: "4vh" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
