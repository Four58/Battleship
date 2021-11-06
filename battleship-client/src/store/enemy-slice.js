import { createSlice } from "@reduxjs/toolkit";

const EnemySlice = createSlice({
  name: "enemy",
  initialState: {
    username: "John",
    score: 0,
  },
  reducers: {},
});

export const EnemyActions = EnemySlice.actions;

export default EnemySlice;
