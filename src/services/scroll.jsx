import { createSlice } from "@reduxjs/toolkit";

const threeSlice = createSlice({
  name: "Drag",
  initialState: {
    scroll: 0,
    direction:false
  },
  reducers: {
    setScroll: (state, action) => {
      state.scroll = action.payload;
    },
    setDirection:(state,action)=>{
      state.direction=action.payload;
    }
  },
});

export const {setScroll,setDirection} = threeSlice.actions;

export default threeSlice.reducer;
