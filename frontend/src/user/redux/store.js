/* global store */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import fontSizeReducer from "./fontRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
    fontSize: fontSizeReducer,
  },
});
