import React from "react";
import Square from "../Square/Square";

export default function Board(props) {
  return (
    <div className="board">
      {props.board.map((row, rowIndex) => (
        <div className="row" key={row}>
          {row.map((square, colIndex) => (
            <Square key={rowIndex + "" + colIndex} square={square} />
          ))}
        </div>
      ))}
    </div>
  );
}
