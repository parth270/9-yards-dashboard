import { createSlice } from "@reduxjs/toolkit";

const threeSlice = createSlice({
  name: "Drag",
  initialState: {
    scroll: 0,
    direction: false,
    curr: 0,
  },
  reducers: {
    setScroll: (state, action) => {
      state.scroll = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setCurr: (state, action) => {
      state.curr = action.payload;
    },
  },
});

export const { setScroll, setDirection,setCurr } = threeSlice.actions;

export default threeSlice.reducer;
