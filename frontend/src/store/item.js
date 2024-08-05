import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch menu items
export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
  const response = await fetch('/api/items');
  const data = await response.json();
  return data.items; // Adjust to match the structure of your response
});

// Thunk to add a new item
export const addItem = createAsyncThunk('menu/addItem', async (newItem) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  const data = await response.json();
  return data.item; // Adjust to match the structure of your response
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
          imageUrl: item.imageFilename ? `https://comideria-russa.b-cdn.net/${item.imageFilename}` : 'default-image-url.jpg'
        }));
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push({
          ...action.payload,
          imageUrl: action.payload.imageFilename ? `https://comideria-russa.b-cdn.net/${action.payload.imageFilename}` : 'default-image-url.jpg'
        });
      });
  },
});

// Export the reducer and the addItem action
export default itemsSlice.reducer;
