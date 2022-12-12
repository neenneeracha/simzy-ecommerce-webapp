/********************************************************************
 *
 * fontRedux.js
 *
 *    This file represents the font size redux that is used to
 *    track and perform actions on changing the font size
 *
 ********************************************************************
 */

import { createSlice } from "@reduxjs/toolkit";

// initial state of the fontSize increase value 
const initialState = {
  // initial font size change value
  fontSize: 0,
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    // increase the font size 
    increaseFontSize: (state, action) => {
      
      // font size change value less than 3
      if (state.fontSize <= 3) {
        state.fontSize += 1;
      }
      // save change values to local storage
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },

    // decrease the font size
    decreaseFontSize: (state, action) => {
      
       // font size change value greater than 0 
      if (state.fontSize >= 0) {
        state.fontSize -= 1;
      }
      // save change values to local storage
      localStorage.setItem("fontSize", JSON.stringify(state.fontSize));
    },
  },
});

export const { increaseFontSize, decreaseFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
