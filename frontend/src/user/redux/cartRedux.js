import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/* initial state of the cart */
const initialState = {
  /* get item from localStorage and include in application state */
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  quantity: 0 /* initial value in the cart */,
  totalprice: 0 /* initial price */,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      /* handle with the product that already existing in the cart */
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      ); /* itemIndex the position of the duplicated item (return <0 if not exist) */

      /* if  already have the item in the cart */
      if (itemIndex >= 0) {
        state.products[itemIndex].cartQuantity += 1;
        toast.success("Product added to cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        }; /* product recived when click add the cart */
        state.products.push(tempProduct);
        toast.success("Product added to cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.products.filter(
        (product) => product.id !== action.payload.id 
      );

      state.products = nextCartItems;
      /* update in localstorage */
      localStorage.setItem("products", JSON.stringify(state.products));

      toast.error('Removed item from the cart!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    },
  },
});

export const { addProduct, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
