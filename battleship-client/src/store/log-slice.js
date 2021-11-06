import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "log",
  initialState: { username: "", login: false },
  reducers: {
    onLogin(state, action) {
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("username", action.payload.username);
      state.username = action.payload.username;
      state.login = true;
    },
    onLogout(state) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      state.username = "";
      state.login = false;
    },
    onLogged(state) {
      const name = localStorage.getItem("username");
      state.username = name;
      state.login = true;
    },
  },
});

export const logActions = logSlice.actions;

export default logSlice;
