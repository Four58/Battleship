import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const username = useSelector((state) => state.log.username);

  return (
    <div>
      <h3>Name: {username}</h3>
      <h3>Score: 0</h3>
    </div>
  );
}
