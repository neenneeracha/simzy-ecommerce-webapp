import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useUser } from "./UserContext"

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
import AdProducts from "./admin/pages/AdProducts";
import AdOrder from "./admin/pages/AdOrder";
import PageNotfound from "./user/pages/PageNotfound";

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
  }
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
    path: "/userinfo",
    element: <UserInfo />,
  },
  {
    path: "/*",
    element: <PageNotfound />,
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/admin",
    element: <AdHome />,
  },
  {
    path: "/viewproducts",
    element: <AdProducts />,
  },
  {
    path: "/vieworders",
    element: <AdOrder />,
  },
  {
    path: "/userinfo",
    element: <UserInfo />,
  },
  {
    path: "/*",
    element: <PageNotfound />,
  }
]);

const RouteApp = () => {
  const user = useUser()
  
  return (
    <RouterProvider router={user == null? guestRouter : user.is_admin === 1? adminRouter : userRouter}/>
  )
}

export default RouteApp
