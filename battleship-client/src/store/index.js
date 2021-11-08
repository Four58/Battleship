import { configureStore } from "@reduxjs/toolkit";
import EnemySlice from "./enemySlice";
import logSlice from "./logSlice";
import generateBoardSlice from "./boardGenerate";
import gameSlice from "./gameSlice";

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
    enemy: EnemySlice.reducer,
    generateBoard: generateBoardSlice.reducer,
    game: gameSlice.reducer,
  },
});

export default store;
