import { configureStore } from "@reduxjs/toolkit";
// import thunk from ''
import CartSlice from "./CreateSlice";

export const store = configureStore({
  reducer: {
    carts: CartSlice,
  },
});
