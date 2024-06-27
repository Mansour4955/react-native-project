import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentStep: 1, complete: false };

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    setComplete(state, action) {
      state.complete = action.payload;
    },
  },
});

export const { setCurrentStep, setComplete } = registerSlice.actions;
export default registerSlice.reducer;
