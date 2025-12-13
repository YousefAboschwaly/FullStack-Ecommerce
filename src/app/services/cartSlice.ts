import type { ICartItem, IProduct } from "@/interfaces";
import { addItemToShoppingCart } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface ICartState {
  cartProducts: ICartItem[];
  cartItemsCount: number;
}
const initialState: ICartState = {
  cartProducts: [],
  cartItemsCount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: IProduct; quantity: number }>) {
    state.cartProducts= addItemToShoppingCart(action.payload,state.cartProducts)
  },
},
});
export const { addToCart } = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
