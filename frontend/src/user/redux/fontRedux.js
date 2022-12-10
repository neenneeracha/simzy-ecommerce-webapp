import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/* initial state of the cart */
const initialState = {
  /* get item from localStorage and include in application state */
  fontSize: 0,
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    customFontSize: (state, action) => {
      /* if  already have the item in the cart */
      if (state.fontSize <= 2) {
        state.fontSize += 1;
      }
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },
    decreaseFontSize: (state, action) => {
      /* if  already have the item in the cart */
      if (state.fontSize >= 0) {
        state.fontSize -= 1;
      }
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },
  },
});

export const { customFontSize,decreaseFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
