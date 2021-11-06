import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./log-slice";

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
  },
});

export default store;
