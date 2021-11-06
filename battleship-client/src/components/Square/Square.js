import React, { useState } from "react";

export default function Square(props) {
  const [classes, setClasses] = useState(props.className);

  function revealSquare() {
    const className = props.className;
    if (className.includes("boom") || className.includes("miss")) {
      return;
    }
    if (className === "") {
      setClasses((prev) => prev + "miss");
    } else {
      setClasses((prev) => prev + "boom");
    }
  }

  return <div id={props.id} onClick={revealSquare} className={classes} />;
}
