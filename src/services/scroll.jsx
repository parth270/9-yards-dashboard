import { createSlice } from "@reduxjs/toolkit";

const threeSlice = createSlice({
  name: "Drag",
  initialState: {
    scroll: 0,
    direction: true,
    curr: 0,
    blur: false,
    dataCurr: 0,
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
    setAppear: (state, action) => {
      state.blur = true;
      state.dataCurr = action.payload;
    },
    setDisAppear: (state, action) => {
      state.blur = false;
    },
  },
});

export const { setScroll, setDirection, setCurr, setAppear,setDisAppear } =
  threeSlice.actions;

export default threeSlice.reducer;
