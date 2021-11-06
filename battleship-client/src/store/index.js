import { configureStore } from "@reduxjs/toolkit";
import EnemySlice from "./enemy-slice";
import logSlice from "./log-slice";
import generateBoardSlice from "./boardGenerate";

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
    enemy: EnemySlice.reducer,
    generateBoard: generateBoardSlice.reducer,
  },
});

export default store;
