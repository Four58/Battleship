import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shoot } from "../../../../../store/boardGenerate";

export default function Square(props) {
  const [bgColor, setBgColor] = useState("grey");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.square.isShip && !props.square.isSelected) {
      setBgColor("green");
    } else if (props.square.isShip && props.square.isSelected) {
      setBgColor("red");
    } else if (!props.square.isShip && props.square.isSelected) {
      setBgColor("black");
    }
  }, [props.square.isShip, props.square.isSelected]);

  function handleClick() {
    // console.log(props.square);
    console.log(`You clicked a square at row ${props.y} column ${props.x}`);
    console.log();
    dispatch(shoot({ x: props.x, y: props.y, player: props.player }));
  }

  const style = {
    width: "2rem",
    height: "2rem",
    backgroundColor: bgColor,
  };

  return (
    <td>
      <div onClick={handleClick} x={props.x} y={props.y} style={style}></div>
    </td>
  );
}
