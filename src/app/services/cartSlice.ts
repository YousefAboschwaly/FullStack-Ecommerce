import type { IProduct } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cartProducts: Array<{ product: IProduct; quantity: number }>;
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
      const { product, quantity } = action.payload;

      const existingItem = state.cartProducts.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartProducts.push({
          product,
          quantity,
        });
      }

      state.cartItemsCount += quantity;
    },
  },
});
export const { addToCart } = cartSlice.actions;
export const selectCart = (state: { cart: ICartState }) => state.cart;
export default cartSlice.reducer;
