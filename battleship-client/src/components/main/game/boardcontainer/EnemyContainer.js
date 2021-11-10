import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Board from "./Board";
import { generateEnemyShips } from "../../../../store/boardGenerate";
import EnemyInfo from "./EnemyInfo";

export default function EnemyContainer() {
  const board = useSelector((state) => state.generateBoard.enemyBoard);

  // For Single Player Mode
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateEnemyShips());
  }, [dispatch]);

  return (
    <div>
      <EnemyInfo />
      <Board board={board} player="enemy" />
    </div>
  );
}
