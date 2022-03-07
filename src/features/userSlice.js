import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("social-user")) || null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    log: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { log, logout, signup } = userSlice.actions;

export default userSlice.reducer;
