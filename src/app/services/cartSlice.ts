import type { ICartItem, IProduct } from "@/interfaces";
import { addItemToShoppingCart, removeItemFromShoppingCart } from "@/utils";
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
    addToCart(state, action: PayloadAction<IProduct>) {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
      state.cartItemsCount += 1;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemToRemove = state.cartProducts.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.cartItemsCount -= itemToRemove.quantity;
      }
      state.cartProducts = removeItemFromShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    clearCart(state) {
      state.cartProducts = [];
      state.cartItemsCount = 0;
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
