
import type { IProduct } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface ICartState{
  cartProducts:  Array<{product: IProduct; quantity: number}>;
  cartItemsCount:number;
}

const initialState:ICartState = {
  cartProducts:[],
  cartItemsCount:10,
}
const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartProducts.push(action.payload);
    },
  },
})
export const {addToCart} = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
