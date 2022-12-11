/********************************************************************
 *
 * cartRedux.js
 *
 *    This file represents the shopping cart redux that is used to
 *    track and perform actions on the user's shopping cart state.
 *
 ********************************************************************
 */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Defining Lodash variable
const _ = require("lodash");

// initial state of the cart
const initialState = {
  // get item from localStorage and include in application state
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  cartTotalQuantity: 0, // initial value in the cart
  cartTotalAmount: 0, // initial price
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add a product to cart
    addProduct: (state, action) => {
      // handle with the product that already existing in the cart
      const itemIndex = state.products.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      const SizeCheck = state.products.findIndex((product, index) => {
        return (
          _.isEqual(product.selectedSize, action.payload.selectedSize) &&
          product.product_id === action.payload.product_id
        );
      });

      const ColorCheck = state.products.findIndex((product) => {
        return (
          _.isEqual(product.color, action.payload.color) &&
          product.product_id === action.payload.product_id
        );
      });

      // if  already have the item in the cart
      if (itemIndex >= 0 && SizeCheck >= 0 && ColorCheck >= 0) {
        state.products[itemIndex].quantity += action.payload.quantity;
        toast.success("Product added to cart", {
          position: "top-center",
        });
      } else {
        const tempProduct = {
          ...action.payload,
        }; // product recived when click add the cart
        state.products.push(tempProduct);
        toast.success("Product added to cart", {
          position: "top-center",
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    // remove a product from cart
    removeFromCart(state, action) {
      const nextCartItems = state.products.filter(
        (product) =>
          product.product_id !== action.payload.product_id ||
          product.selectedSize !== action.payload.selectedSize ||
          product.color !== action.payload.color
      );

      state.products = nextCartItems;

      localStorage.setItem("products", JSON.stringify(state.products));

      toast.error("Deleted Item from cart", {
        position: "top-center",
      });
    },
    // clear cart
    clearCart(state, action) {

      state.products = [];
      localStorage.removeItem("products");

    },
    // get the number of all products and price in the cart
    getTotals(state, action) {
      let { total, totalQuantity } = state.products.reduce(
        (cartTotal, product) => {
          const { price, quantity } = product;
          const itemTotal =
            price * quantity; // total pricce for specific item 

          cartTotal.total += itemTotal;
          cartTotal.totalQuantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          totalQuantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = totalQuantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addProduct,
  removeFromCart,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
