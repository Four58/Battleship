import React, { useState, useEffect } from "react";
import "./Counter.css";
import { useSelector } from "react-redux";

const Counter = (props) => {
  const [timer, setTimer] = useState(10);
  const [reset, setReset] = useState(false);
  const checkLog = useSelector((state) => state.log.login);

  useEffect(() => {
    console.log("useeffect timeer");
    setReset(props.click);

    // console.log("Click" + reset);
    // console.log("Login" + checkLog);
    const interval = setInterval(() => {
      if (timer > 0 && checkLog && !reset) {
        setTimer((prevCounter) => prevCounter - 1);
      } else {
        setReset(false);
        props.reset(false);
        setTimer(10);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkLog, timer, reset, props]);

  return <h2 className="timer">Timer: {timer}</h2>;
};

export default Counter;
