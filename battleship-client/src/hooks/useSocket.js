import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const useSocket = () => {
  const [inData, setInData] = useState({});
  const [outData, setOutData] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {});

    socketRef.current.onAny((eventName, data) => {
      setInData((prev) => ({ ...prev, eventName, data }));
    });

    return () => {
      socketRef.current.offAny();
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(outData);
    if (outData["eventName"] && outData["data"]) {
      socketRef.current.emit(outData["eventName"], outData["data"]);
    }
  }, [outData]);

  const setOutDataSocket = ({ eventName, data }) => {
    setOutData((prev) => {
      const temp = { ...prev, eventName, data };
      return temp;
    });
  };

  setOutDataSocket.propTypes = {
    eventName: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
  };

  return [inData, setOutDataSocket];
};

export default useSocket;
