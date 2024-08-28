import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


// Thunk to fetch menu items
export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
  const response = await fetch('/api/items');
  const data = await response.json();
  return data.items;
});

// Thunk to add a new item
export const addItem = createAsyncThunk('menu/addItem', async (newItem) => {
    const response = await csrfFetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newItem,
        imageFilename: newItem.imageFilename,
      }),
    });
    const data = await response.json();
    return { ...data.item, imageFilename: newItem.imageFilename };
  });

// Slice
const itemsSlice = createSlice({
  name: 'menu',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    updateItemRating: (state, action) => {
        const { itemId, newRating } = action.payload;
        const item = state.items.find(item => item.id === itemId);
        if (item) {
          item.stars += newRating;
          item.numRatings += 1;
        }
      }
  },
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
      .addCase(addItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push({
          ...action.payload,
          imageUrl: action.payload.imageFilename ? `https://comideria-russa.b-cdn.net/${action.payload.imageFilename}` : 'default-image-url.jpg',
        });
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { updateItemRating } = itemsSlice.actions;
export default itemsSlice.reducer;
