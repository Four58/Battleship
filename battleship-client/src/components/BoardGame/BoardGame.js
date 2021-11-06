import React, { useState, useEffect } from "react";
import "./BoardGame.css";
import Square from "../Square/Square";

const WIDTH = 10;
// const shipArray = [
//   {
//     name: "destroyer",
//     positions: [
//       [0, 1],
//       [0, WIDTH],
//     ],
//   },
//   {
//     name: "submarine",
//     positions: [
//       [0, 1, 2],
//       [0, WIDTH, WIDTH * 2],
//     ],
//   },
//   {
//     name: "cruiser",
//     positions: [
//       [0, 1, 2],
//       [0, WIDTH, WIDTH * 2],
//     ],
//   },
//   {
//     name: "battleship",
//     positions: [
//       [0, 1, 2, 3],
//       [0, WIDTH, WIDTH * 2, WIDTH * 3],
//     ],
//   },
//   {
//     name: "carrier",
//     positions: [
//       [0, 1, 2, 3, 4],
//       [0, WIDTH, WIDTH * 2, WIDTH * 3, WIDTH * 4],
//     ],
//   },
// ];

const BoardGame = (props) => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    setSquares(createHorizon());
  }, []);

  const createHorizon = () => {
    const squaresJSX = [];
    // const squares = {};
    // if (props.player === "enemy") {
    //   shipArray.forEach((ship) => {
    //     generateRandomShip(squares, ship);
    //   });
    // }
    // for (let i = 0; i < 100; i++) {
    //   const classes = squares[i] || "";
    //   squaresJSX.push(
    //     <Square key={i} id={i} className={classes}/>
    //   );
    // }
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      squaresJSX.push(<Square key={i} id={i} className="" />);
    }
    return squaresJSX;
  };

  // const generateRandomShip = (squares, ship) => {
  //   const randomDirection = Math.floor(Math.random() * ship.positions.length);
  //   const direction = randomDirection === 0 ? 1 : 10;
  //   const randomPosition = Math.abs(
  //     Math.floor(Math.random() * WIDTH * WIDTH) -
  //       direction * ship.positions[randomDirection].length
  //   );

  //   const isTaken = ship.positions[randomDirection].some(
  //     (index) => squares[randomPosition + index] !== undefined
  //   );

  //   let eligible;
  //   if (randomDirection === 0) {
  //     eligible =
  //       Math.floor(randomPosition / 10) ===
  //       Math.floor((randomPosition + ship.positions[0].length) / 10);
  //   } else {
  //     ship.positions[randomDirection].every(
  //       (index) => randomPosition + index < 100
  //     );
  //   }

  //   if (isTaken || !eligible) {
  //     generateRandomShip(squares, ship);
  //   } else {
  //     ship.positions[randomDirection].forEach((index) => {
  //       squares[randomPosition + index] = ship.name;
  //     });
  //   }
  // };

  return (
    <div>
      <table>
        <tbody>
          {props.board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((square, colIndex) => (
                <Square
                  key={rowIndex + "" + colIndex}
                  x={rowIndex}
                  y={colIndex}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardGame;
