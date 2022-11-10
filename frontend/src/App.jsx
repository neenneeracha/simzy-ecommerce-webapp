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
