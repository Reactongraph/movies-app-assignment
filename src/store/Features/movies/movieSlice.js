import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieData: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,

  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setData } = movieSlice.actions;

export default movieSlice.reducer;
