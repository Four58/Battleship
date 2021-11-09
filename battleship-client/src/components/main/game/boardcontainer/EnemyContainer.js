import React from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import EnemyInfo from "./EnemyInfo";

export default function EnemyContainer() {
  const board = useSelector((state) => state.generateBoard.enemyBoard);

  return (
    <div>
      <EnemyInfo />
      <Board board={board} player="enemy" />
    </div>
  );
}
