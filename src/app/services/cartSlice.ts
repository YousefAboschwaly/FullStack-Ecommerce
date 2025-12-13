import type { ICartItem, IProduct } from "@/interfaces";
import { addItemToShoppingCart, removeItemFromShoppingCart } from "@/utils";
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
      const itemToRemove = state.cartProducts.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove && itemToRemove.quantity>1) {
        state.cartProducts = state.cartProducts.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      state.cartProducts = removeItemFromShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    clearCart(state) {
      state.cartProducts = [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
