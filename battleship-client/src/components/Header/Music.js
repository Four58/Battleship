import React, { useEffect, useState } from "react";
import niceMusic from "../../assets/battleship.mp3";
import classes from "./Music.module.css";

const Music = (props) => {
  return (
    <button
      style={{ width: "8%" }}
      className={classes.button}
      onClick={() => props.setPlaying((prev) => !prev)}
    >
      {props.playing ? "pause" : "play "}
    </button>
  );
};
export default Music;
