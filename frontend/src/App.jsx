<<<<<<< HEAD
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import Profile from "./pages/Profile";




// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/products",
    element: <ProductList/>
  },
  {
    path: "/product/:id",
    element: <Product/>
  },
  {
    path: "/cart",
    element: <Cart/>
  }, 
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/checkout",
    element: <Checkout/>
  },
  {
    path: "/summary",
    element: <Summary/>
  },
  {
    path: "/success",
    element: <Success/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
])

const App = () => {

  // const user = true

  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<Home/>} > </Route>
    //     <Route path='/Products/:category' element={<ProductList/>} > </Route>
    //     <Route path='/Product/:id' element={<Product/>} > </Route>
    //     <Route path='/Cart' element={<Product/>} > </Route>
    //     <Route path='/Login' element={ user ? <Navigate to = "/"/> : <Login/> } > </Route>
    //     <Route path='/Register' element={ user ? <Navigate to = "/"/> : <Register/> }  > </Route>
    //   </Routes>
    // </Router>
    //  <Home />
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
=======
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import Profile from "./pages/Profile";




// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/products",
    element: <ProductList/>
  },
  {
    path: "/product/:id",
    element: <Product/>
  },
  {
    path: "/cart",
    element: <Cart/>
  }, 
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/checkout",
    element: <Checkout/>
  },
  {
    path: "/summary",
    element: <Summary/>
  },
  {
    path: "/success",
    element: <Success/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
])

const App = () => {

  // const user = true

  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<Home/>} > </Route>
    //     <Route path='/Products/:category' element={<ProductList/>} > </Route>
    //     <Route path='/Product/:id' element={<Product/>} > </Route>
    //     <Route path='/Cart' element={<Product/>} > </Route>
    //     <Route path='/Login' element={ user ? <Navigate to = "/"/> : <Login/> } > </Route>
    //     <Route path='/Register' element={ user ? <Navigate to = "/"/> : <Register/> }  > </Route>
    //   </Routes>
    // </Router>
    //  <Home />
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
