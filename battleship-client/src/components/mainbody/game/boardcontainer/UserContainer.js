import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateUserShips } from "../../../../store/boardGenerate";
import Board from "./board/Board";
import UserInfo from "./UserInfo";

export default function UserContainer() {
  const board = useSelector((state) => state.generateBoard.userBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateUserShips());
  }, [dispatch]);

  return (
    <div>
      <UserInfo />
      <Board board={board} player="user" />
    </div>
  );
}
