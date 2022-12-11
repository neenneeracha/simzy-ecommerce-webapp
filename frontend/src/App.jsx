/********************************************************************
 *
 * App.jsx
 *
 *    This file represents the the oncatenation of all the
 *    application's files
 *
 ********************************************************************
 */

import React from "react";
import RouteApp from "./RouteApp";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <UserProvider>
      <RouteApp />
    </UserProvider>
  );
};

export default App;
