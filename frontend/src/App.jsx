/********************************************************************
 *
 * App.jsx
 *
 *    This file represents the concatenation of all the
 *    application's files
 *
 ********************************************************************
 */

import React from "react";
import RouteApp from "./RouteApp";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <RouteApp />
    </UserProvider>
  );
};

export default App;
