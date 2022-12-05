import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Defining Lodash variable
const _ = require("lodash");

/* initial state of the cart */
const initialState = {
    /* get item from localStorage and include in application state */
    products: localStorage.getItem("products") ?
        JSON.parse(localStorage.getItem("products")) :
        [],
    cartTotalQuantity: 0 /* initial value in the cart */ ,
    cartTotalAmount: 0 /* initial price */ ,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            /* handle with the product that already existing in the cart */
            const itemIndex = state.products.findIndex(
                (item) => item.product_id === action.payload.product_id
            ); /* itemIndex the position of the duplicated item (return <0 if not exist) */

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

            /* if  already have the item in the cart */
            if (itemIndex >= 0 && SizeCheck >= 0 && ColorCheck >= 0) {
                state.products[itemIndex].quantity += action.payload.quantity;
                toast.success("Product added to cart", {
                    position: "top-center",
                });
            } else {
                const tempProduct = {
                    ...action.payload,
                }; /* product recived when click add the cart */
                state.products.push(tempProduct);
                toast.success("Product added to cart", {
                    position: "top-center",
                });
            }

            localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeFromCart(state, action) {
            /* return undeleted item */
            const nextCartItems = state.products.filter(
                (product) =>
                product.product_id !== action.payload.product_id ||
                product.selectedSize !== action.payload.selectedSize ||
                product.color !== action.payload.color
            );

            state.products = nextCartItems;
            /* update in localstorage */
            localStorage.setItem("products", JSON.stringify(state.products));

            toast.error("Deleted Item from cart", {
                position: "top-center",
            });
        },
        clearCart(state, action) {
            /* clear cart */
            state.products = [];
            /* clear localstorage */
            localStorage.removeItem("products");
        },
        decreaseCart(state, action) {
            const itemIndex = state.products.findIndex(
                (product) => product.product_id === action.payload.product_id
            );

            if (state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;

                toast.info("Decreased product quantity", {
                    position: "top-center",
                });
            } else if (state.products[itemIndex].quantity === 1) {
                const nextProducts = state.products.filter(
                    (product) => product.product_id !== action.payload.product_id
                );

                state.products = nextProducts;

                toast.error("Product removed from cart", {
                    position: "top-center",
                });
            }

            localStorage.setItem("products", JSON.stringify(state.products));
        },
        getTotals(state, action) {
            let { total, totalQuantity } = state.products.reduce(
                (cartTotal, product) => {
                    const { price, quantity } = product;
                    const itemTotal =
                        price * quantity; /* total pricce for specific item */

                    cartTotal.total += itemTotal;
                    cartTotal.totalQuantity += quantity;

                    return cartTotal;
                }, {
                    /* initial value */
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

export const { addProduct, removeFromCart, clearCart, decreaseCart, getTotals } =
cartSlice.actions;
export default cartSlice.reducer;