import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { updateItemRating } from './item';

export const fetchReviewsForItems = createAsyncThunk(
    'reviews/fetchForItems',
    async (itemIds, { rejectWithValue }) => {
      try {
        const response = await csrfFetch(`/api/reviews/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemIds }),
        });
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const createReview = createAsyncThunk(
    'reviews/create',
    async (reviewData, { rejectWithValue, dispatch }) => {
      try {
        // Validate reviewData
        if (typeof reviewData.userId !== 'number' || typeof reviewData.itemId !== 'number') {
          throw new Error('Invalid userId or itemId');
        }
  
        const response = await csrfFetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error('Failed to create review');
        const data = await response.json();

        // Dispatch an action to update the item's rating in the menu slice
        dispatch(updateItemRating({
          itemId: reviewData.itemId,
          newRating: reviewData.rating
        }));
      
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const editReview = createAsyncThunk(
  'reviews/edit',
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to edit review');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
    'reviews/delete',
    async ({ reviewId, itemId }, { rejectWithValue }) => {
      try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete review');
        return { reviewId, itemId };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: { reviews: {}, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReviewsForItems.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchReviewsForItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.reviews = { ...state.reviews, ...action.payload };
        })
        .addCase(fetchReviewsForItems.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(createReview.fulfilled, (state, action) => {
          const { itemId } = action.payload;
          if (!state.reviews[itemId]) {
            state.reviews[itemId] = [];
          }
          state.reviews[itemId].push(action.payload);
        })
        .addCase(editReview.fulfilled, (state, action) => {
          const { itemId, id } = action.payload;
          const index = state.reviews[itemId].findIndex(review => review.id === id);
          if (index !== -1) {
            state.reviews[itemId][index] = action.payload;
          }
        })
        .addCase(deleteReview.fulfilled, (state, action) => {
          const { itemId, reviewId } = action.payload;
          state.reviews[itemId] = state.reviews[itemId].filter(review => review.id !== reviewId);
        });
    },
  });
  
  export default reviewSlice.reducer;
