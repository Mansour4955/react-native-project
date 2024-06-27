import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice"; // Assuming your slice file is named registerSlice.js

const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export default store;
