import React from "react";
import classes from "./UserInfo.module.css";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const username = useSelector((state) => state.log.username);

  const h3Style = { marginTop: "0.5em", marginBottom: "0.5em" };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "bottom-right",
        flexDirection: "column",
      }}
    >
      <img
        src={`https://avatars.dicebear.com/api/big-smile/${username}.svg`}
        alt="random avatar"
        width="50"
        height="50"
      />
      <div className={classes.control}>
        <h3 style={h3Style}>Name: {username}</h3>
        <h3 style={h3Style}>Score: 0</h3>
      </div>
    </div>
  );
}
