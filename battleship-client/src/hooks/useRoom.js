import { useState, useEffect, useCallback } from "react";

const CREATE_ROOM_EVENT = "createRoom";
const FETCH_ROOM_EVENT = "fetchRoom";
const JOIN_ROOM_EVENT = "joinRoom";

const useRoom = (inData, setOutData) => {
    const [rooms, setRooms] = useState({});

    const fetchRoom = useCallback(() => {
        console.log("fetching room");
        setOutData({eventName: FETCH_ROOM_EVENT, data: {} })
    }, [])

    const createRoom = (roomData) => {
        setOutData({ eventName: CREATE_ROOM_EVENT, data: { roomData } });
    }

    const joinRoom = (roomId) => {
        setOutData({ eventName: JOIN_ROOM_EVENT, data: { roomId } });
    }

    useEffect(() => {
        fetchRoom();
    }, [fetchRoom])

    useEffect(() => {
        switch(inData['eventName']) {
            case FETCH_ROOM_EVENT:
                const { rooms } = inData['data'];
                setRooms(rooms);
                break;
            
            default:
                break;
        }
    }, [inData])

    return [rooms, joinRoom, createRoom];
}

export default useRoom;