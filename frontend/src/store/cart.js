import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
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
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((i) => i.id !== item.id);
      saveCartToStorage(state.items);
    },
    increaseItemQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    decreaseItemQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
      saveCartToStorage(state.items);
    },
    loadCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseItemQuantity, 
  decreaseItemQuantity,
  loadCart
} = cartSlice.actions;

export default cartSlice.reducer;
