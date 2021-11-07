import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  score: 0,
};

const EnemySlice = createSlice({
  name: "enemy",
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.username = action.payload.username
    },
    clearUser: (state) => {
      state = {...state, ...initialState};
    }
  },
});

export const { setName, clearUser } = EnemySlice.actions;

export default EnemySlice;
