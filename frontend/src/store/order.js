// store/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const createOrder = createAsyncThunk(
  'orders/create',
  async ({ routeId, total, orderDate, items }, { rejectWithValue }) => {
    try {
      const orderResponse = await csrfFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId, total, orderDate, items }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');
      const orderData = await orderResponse.json();

      const orderItemsResponse = await csrfFetch('/api/order-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderData.order.id, items }),
      });

      if (!orderItemsResponse.ok) throw new Error('Failed to create order items');
      const orderItemsData = await orderItemsResponse.json();

      return { ...orderData, orderItems: orderItemsData.orderItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: { currentOrder: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
