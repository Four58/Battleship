import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const username = useSelector((state) => state.log.username);

  const h3Style = { marginTop: "0.5em", marginBottom: "0.5em" };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3 style={h3Style}>Name: {username}</h3>
      <h3 style={h3Style}>Score: 0</h3>
    </div>
  );
}
