import {createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice ({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,    /* initial value in the cart */
        totalprice: 0   /* initial price */
    },

    reducers:{
        addProduct:(state, action) => {
            state.quantity += 1; /* increase quantity number */ 
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer;