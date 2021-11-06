import React from "react";
import Square from "./Square";

export default function Board(props) {
  return (
    <table style={{ borderSpacing: 0.5 }}>
      <tbody>
        {props.board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((square, colIndex) => (
              <Square
                key={rowIndex + "" + colIndex}
                x={colIndex}
                y={rowIndex}
                square={square}
                player={props.player}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
