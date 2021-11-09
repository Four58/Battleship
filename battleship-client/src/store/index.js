import { configureStore } from "@reduxjs/toolkit";
import EnemySlice from "./enemySlice";
import logSlice from "./logSlice";
import generateBoardSlice from "./boardGenerate";
import gameSlice from "./gameSlice";
import exitSlice from "./exitSlice";

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
    enemy: EnemySlice.reducer,
    generateBoard: generateBoardSlice.reducer,
    game: gameSlice.reducer,
    exit: exitSlice.reducer,
  },
});

export default store;
