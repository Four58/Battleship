import React from "react";
import { useSelector } from "react-redux";

export default function EnemyInfo(props) {
  const enemy = useSelector((state) => state.enemy);

  const h3Style = { marginTop: "0.5em", marginBottom: "0.5em" };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3 style={h3Style}>Name: {enemy.username}</h3>
      <h3 style={h3Style}>Score: {enemy.score}</h3>
    </div>
  );
}
