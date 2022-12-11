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
import Profile from "./user/pages/Profile";
import Admin from "./admin/pages/Admin";
import ViewUsers from "./admin/pages/ViewUsers";
import ViewOrders from "./admin/pages/ViewOrders";
import PageNotfound from "./user/pages/PageNotfound";
import ViewProducts from "./admin/pages/ViewProducts";
import SuccessProduct from "./admin/pages/SuccessProduct";
import PaymentProcessing from "./user/pages/PaymentProcessing";

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
  {
    path: "/checkout",
    element: <Navigate to="/login" />,
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
    path: "/processing",
    element: <PaymentProcessing />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/*",
    element: <PageNotfound />,
  },
  
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/vieworders?status_id=6" />,
  },
  {
    path: "/viewproducts",
    element: <ViewProducts />,
  },
  {
    path: "/vieworders",
    element: <ViewOrders />,
  },
  {
    path: "/viewusers",
    element: <ViewUsers />,
  },
  {
    path: "/successadded",
    element: <SuccessProduct />,
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
