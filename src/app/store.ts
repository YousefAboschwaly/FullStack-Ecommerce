import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/Auth";
import cartSlice from "./services/cartSlice";
import globalSlice from "./services/globalSlice";

// Redux Persist imports
import storage from "redux-persist/lib/storage"; // يستخدم localStorage
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { productsApi } from "./services/products";

// إعداد persist للـ cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: persistedCartReducer, // استبدل cartSlice بالـ persisted version
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // لتجنب مشاكل مع redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, productsApi.middleware),
});

// persist store
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
