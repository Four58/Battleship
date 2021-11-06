import { useState, useRef, useEffect, useCallback } from "react";
import classes from "./Chat.module.css";
import { useSelector } from "react-redux";

// const userMessage = [];

const Chat = () => {
  // const [userMessage, setUserMessage] = useState([{ Test: "Hellooo" }]);
  const userType = useRef();
  const username = useSelector((state) => state.log.username);
  const enemyname = useSelector((state) => state.enemy.username);
  const [chatHistory, setChatHistory] = useState([]);

  const name = localStorage.getItem("username");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/chat.json"
      );

      if (!response.ok) {
        throw new Error("Sad life");
      }

      const data = await response.json();
      const chatTalk = [];
      if (data.username !== name) {
        console.log(data.chat);
        chatTalk.push(data);
      }
      setChatHistory(chatTalk);
      return;
    } catch (error) {
      console.log(error.message);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendChat = async () => {
    try {
      const response = await fetch(
        "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/chat.json",
        {
          method: "PUT",
          body: JSON.stringify({
            username: username,
            chat: userType.current.value,
          }),
          header: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Sad life");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userType.current.value.trim() === "") {
      return;
    }
    setChatHistory((prev) => {
      return [...chatHistory, { [username]: userType.current.value }];
    });
    sendChat();
    userType.current.value = "";
    console.log(chatHistory);
  };

  return (
    <div className={classes.bodybox}>
      <div className={classes.chatborder}>
        <div>
          <h3>Chat</h3>
          <p>Server: Welcome {username}</p>
          <p>Server: Welcome {enemyname}</p>
          {chatHistory.map((message) => {
            return Object.keys(message).map((sendUser) => {
              return (
                <p key={Date.now()}>
                  <span
                    style={{
                      color: sendUser === username ? "#1d9cb8" : "#b84b1d",
                    }}
                  >
                    {sendUser}
                  </span>
                  : {message[sendUser]}
                </p>
              );
            });
          })}
        </div>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            name="chat"
            id="chatbox"
            ref={userType}
            placeholder="Type something to the opponent"
            style={{ width: "100%", minHeight: "4vh" }}
          />
        </form>
        <button onClick={fetchData}>Friend Response</button>
      </div>
    </div>
  );
};

export default Chat;
