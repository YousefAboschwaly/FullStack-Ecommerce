import type { ICartItem, IProduct } from "@/interfaces";
import { addItemToShoppingCart, deleteSelectedItem, removeItemFromShoppingCart } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cartProducts: ICartItem[];
}
const initialState: ICartState = {
  cartProducts: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    removeFromCart(state, action: PayloadAction<number>) {
     
      state.cartProducts = removeItemFromShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    deleteSelected(state, action: PayloadAction<number>) {
     
      state.cartProducts = deleteSelectedItem(
        action.payload,
        state.cartProducts
      );
    },
    clearCart(state) {
      state.cartProducts = [];
    },
  },
});
export const { addToCart, removeFromCart, deleteSelected,clearCart } = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
