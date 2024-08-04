import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch menu items
export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
  const response = await fetch('/api/items');
  const data = await response.json();
  return data.items; // Adjust to match the structure of your response
});

// Initial state
const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

// Slice
const itemsSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
          ...item,
          imageUrl: item.ItemImage?.url || 'default-image-url.jpg'
        }));
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default itemsSlice.reducer;
