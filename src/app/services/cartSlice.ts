
import type { IProduct } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface ICartState{
  cartProducts:  Array<{product: IProduct; quantity: number}>;
}

const initialState:ICartState = {
  cartProducts:[],
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
export default cartSlice.reducer;
