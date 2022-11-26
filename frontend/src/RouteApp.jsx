import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useUser } from "./UserContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
import Admin from "./admin/pages/Admin";
import ViewProducts from "./admin/pages/ViewProducts";
import PageNotfound from "./user/pages/PageNotfound";
import NewUser from "./admin/pages/NewUser";
import NewProduct from "./admin/pages/NewProduct";

import { userInputs, productInputs, popularProducts } from "./data";
const guestRouter = createBrowserRouter([
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
    path: "/*",
    element: <PageNotfound />,
  },
]);

const userRouter = createBrowserRouter([
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
    element: <Navigate to="/" />,
  },
  {
    path: "/register",
    element: <Navigate to="/" />,
  },
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
    path: "/*",
    element: <PageNotfound />,
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/viewproducts",
    element: <ViewProducts inputs = { popularProducts } title = "Product" />,
  },
  {
    path: "/vieworders",
    element: <ViewProducts inputs = { popularProducts } title = "Order" />,
  },
  {
    path: "/viewusers",
    element: <ViewProducts inputs = { popularProducts } title = "User" />,
  },
  {
    path: "/newuser",
    element: <NewUser inputs = { userInputs }  />,
  },
  {
    path: "/newproduct",
    element: <NewProduct inputs = { productInputs } />,
  },
  {
    path: "/*",
    element: <PageNotfound />,
  },

]);

const RouteApp = () => {
  const user = useUser();

  return (
    <>
      <RouterProvider
        router={
          user == null
            ? guestRouter
            : user.is_admin === 1
            ? adminRouter
            : userRouter
        }
      />
      <ToastContainer />
    </>
  );
};

export default RouteApp;
