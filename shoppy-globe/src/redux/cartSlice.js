import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  cartItems: [], // items array starts empty
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialData,
  reducers: {
    // naya item add karne ke liye
    addItem: (state, action) => {
      const exists = state.cartItems.find((p) => p.id === action.payload.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    // item hatane ke liye
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((p) => p.id !== action.payload);
    },
    // quantity change karne ke liye
    updateQty: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.amount;
      }
    },
    // cart clear karne ke liye (checkout ke baad)
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, updateQty, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
