import { createSlice } from "@reduxjs/toolkit";

function createEmptyBoard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({
        isShip: false,
        isSelected: false,
        coorX: j,
        coorY: i,
      });
    }
  }
  return board;
}

function isSquareValid(board, x, y) {
  if (!board[y] || !board[y][x]) return false;

  if (board[y][x].isShip) return false;

  return true;
}

function createShipInRandom(board) {
  const randomDirection = Math.floor(Math.random() * 2);
  const randomX = Math.floor(Math.random() * 10);
  const randomY = Math.floor(Math.random() * 10);
  const positionOffset = [0, 1, 2, 3];
  if (randomDirection === 0) {
    if (
      positionOffset.some(
        (pos) => !isSquareValid(board, randomX + pos, randomY)
      )
    ) {
      createShipInRandom(board);
      return;
    }
    positionOffset.forEach((pos) => {
      board[randomY][randomX + pos] = {
        ...board[randomY][randomX + pos],
        isShip: true,
      };
    });
  } else {
    if (
      positionOffset.some(
        (pos) => !isSquareValid(board, randomX, randomY + pos)
      )
    ) {
      createShipInRandom(board);
      return;
    }
    positionOffset.forEach((pos) => {
      board[randomY + pos][randomX] = {
        ...board[randomY + pos][randomX],
        isShip: true,
      };
    });
  }
  // console.log("D " + randomDirection);
  // console.log("X " + randomX);
  // console.log("Y " + randomY);
}

const board = createEmptyBoard();
for (let i = 0; i < 4; i++) {
  createShipInRandom(board);
}

const generateBoardSlice = createSlice({
  name: "generateBoard",
  initialState: {
    userBoard: createEmptyBoard(),
    enemyBoard: createEmptyBoard(),
    ship: {},
  },
  reducers: {
    generateUserShips: (state) => {
      const board = createEmptyBoard();
      for (let i = 0; i < 4; i++) {
        createShipInRandom(board);
      }
      state.userBoard = board;
    },
    setEnemyBoard: (state, action) => {
      const board = action.payload.board;
      state.enemyBoard = board;
    },
    shoot: (state, action) => {
      const x = action.payload.x;
      const y = action.payload.y;
      const player = action.payload.player;
      console.log(player);
      if (player === "user") {
        if (state.userBoard[y][x].isSelected) {
          return;
        }
        console.log("User");
        state.userBoard[y][x].isSelected = true;
      } else if (player === "enemy") {
        if (state.enemyBoard[y][x].isSelected) {
          return;
        }
        console.log("Enemy");
        state.enemyBoard[y][x].isSelected = true;
      }
    },
  },
});

export const { generateUserShips, setEnemyBoard, shoot } =
  generateBoardSlice.actions;

export default generateBoardSlice;
