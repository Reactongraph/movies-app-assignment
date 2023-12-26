import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: null,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOut: () => {
      return { ...initialState, isAuth: false };
    },

    logIn: (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
