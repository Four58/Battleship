import { useState, useEffect, useCallback } from "react";

const CREATE_ROOM_EVENT = "createRoom";
const FETCH_ROOM_EVENT = "fetchRoom";
const LEAVE_ROOM_EVENT = "leaveRoom";
const JOIN_ROOM_EVENT = "joinRoom";

const useRoom = (inData, setOutData) => {
  const [rooms, setRooms] = useState({});

  const leaveRoom = useCallback(() => {
    console.log("leaving room");
    setOutData({ eventName: LEAVE_ROOM_EVENT, data: {} });
  }, []);

  const createRoom = (roomData) => {
    setOutData({ eventName: CREATE_ROOM_EVENT, data: { roomData } });
  };

  const joinRoom = (roomId, username) => {
    console.log(roomId);
    setOutData({ eventName: JOIN_ROOM_EVENT, data: { roomId, username } });
  };

  useEffect(() => {
    switch (inData["eventName"]) {
      case FETCH_ROOM_EVENT:
        console.log("fetching room oh yeah");
        const { rooms } = inData["data"];
        setRooms(rooms);
        break;

      default:
        break;
    }
  }, [inData]);

  return [rooms, joinRoom, createRoom, leaveRoom];
};

export default useRoom;
