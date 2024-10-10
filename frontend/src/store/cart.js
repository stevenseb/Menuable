import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
    tempReservedQuantities: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      // Update temporary reserved quantity
      state.tempReservedQuantities[item.id] =
        (state.tempReservedQuantities[item.id] || 0) + 1;
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // Release temporary reserved quantity
        state.tempReservedQuantities[item.id] -= existingItem.quantity;
        if (state.tempReservedQuantities[item.id] <= 0) {
          delete state.tempReservedQuantities[item.id];
        }
      }
      state.items = state.items.filter((i) => i.id !== item.id);
      saveCartToStorage(state.items);
    },
    increaseItemQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        // Update temporary reserved quantity
        state.tempReservedQuantities[item.id] =
          (state.tempReservedQuantities[item.id] || 0) + 1;
      }
      saveCartToStorage(state.items);
    },
    decreaseItemQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity -= 1;
        // Release temporary reserved quantity
        state.tempReservedQuantities[item.id] -= 1;
        if (state.tempReservedQuantities[item.id] <= 0) {
          delete state.tempReservedQuantities[item.id];
        }
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
      saveCartToStorage(state.items);
    },
    loadCart: (state) => {
      state.items = loadCartFromStorage();
      // Reset temporary reserved quantities
      state.tempReservedQuantities = {};
      state.items.forEach((item) => {
        state.tempReservedQuantities[item.id] = item.quantity;
      });
    },
    clearCart: (state) => {
      state.items = [];
      state.tempReservedQuantities = {};
      saveCartToStorage(state.items);
    },
    expireCart: (state) => {
      state.tempReservedQuantities = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  loadCart,
  clearCart,
  expireCart,
} = cartSlice.actions;

export default cartSlice.reducer;
