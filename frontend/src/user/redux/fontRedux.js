import { createSlice } from "@reduxjs/toolkit";

/* initial state of the fontSize increase value */
const initialState = {
  /* get item from localStorage and include in application state */
  fontSize: 0,
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    increaseFontSize: (state, action) => {
      
      if (state.fontSize <= 2) {
        state.fontSize += 1;
      }
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },
    decreaseFontSize: (state, action) => {
     
      if (state.fontSize >= 0) {
        state.fontSize -= 1;
      }
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },
  },
});

export const { increaseFontSize,decreaseFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
