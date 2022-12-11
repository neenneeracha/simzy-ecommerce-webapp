/********************************************************************
 *
 * store.js
 *
 *    This file represents the store of the redux which hold the 
 *    entire state of the application.
 *
 ********************************************************************
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import fontSizeReducer from "./fontRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
    fontSize: fontSizeReducer,
  },
});
