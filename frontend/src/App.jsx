import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./user/pages/Home";
import Product from "./user/pages/Product";
import ProductList from "./user/pages/ProductList";
import Register from "./user/pages/Register";
import Login from "./user/pages/Login";
import Cart from "./user/pages/Cart";
import Checkout from "./user/pages/Checkout";
import Summary from "./user/pages/Summary";
import Success from "./user/pages/Success";
import UserInfo from "./user/pages/UserInfo";
import AdHome from "./admin/pages/AdHome";
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
  {
    path: "/admin",
    element: <AdHome />,
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
