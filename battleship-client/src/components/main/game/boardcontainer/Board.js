import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shoot } from "../../../../store/boardGenerate";

export default function Board(props) {
  return (
    <table
      style={{
        borderSpacing: 0.5,
        padding: "0.5rem",
        border: "1px solid black",
      }}
    >
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

function Square(props) {
  const [bgColor, setBgColor] = useState("grey");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.square.isShip && !props.square.isSelected) {
      setBgColor("green");
      if (props.player === "enemy") setBgColor("blue");
    } else if (props.square.isShip && props.square.isSelected) {
      setBgColor("red");
    } else if (!props.square.isShip && props.square.isSelected) {
      setBgColor("black");
    } else {
      setBgColor("grey");
    }
  }, [props.square.isShip, props.square.isSelected, props.player]);

  function handleClick() {
    console.log(`You clicked a square at row ${props.y} column ${props.x}`);
    dispatch(shoot({ x: props.x, y: props.y, player: props.player }));
  }

  return (
    <td>
      <div
        className="square"
        onClick={handleClick}
        data-x={props.x}
        data-y={props.y}
        style={{ width: "2rem", height: "2rem", backgroundColor: bgColor }}
      ></div>
    </td>
  );
}
