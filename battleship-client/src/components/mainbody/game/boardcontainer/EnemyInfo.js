import React from "react";
import { useSelector } from "react-redux";

export default function EnemyInfo(props) {
  const enemy = useSelector((state) => state.enemy);
  console.log(enemy)

  return (
    <div>
      <h3>Name: {enemy.username}</h3>
      <h3>Score: {enemy.score}</h3>
    </div>
  );
}
