import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import UserInfo from "./pages/UserInfo";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/userinfo",
    element: <UserInfo />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
