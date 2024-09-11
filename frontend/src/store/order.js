import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await csrfFetch(`/api/users/${userId}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async ({ routeId, total, orderDate, items }, { rejectWithValue, dispatch }) => {
      try {
        // Create the order
        const orderResponse = await csrfFetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ routeId, total, orderDate, items }),
        });
  
        if (!orderResponse.ok) throw new Error('Failed to create order');
        const orderData = await orderResponse.json();
  
        // Create order items
        const orderItemsResponse = await csrfFetch('/api/order-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderData.order.id, items }),
        });
  
        if (!orderItemsResponse.ok) throw new Error('Failed to create order items');
        const orderItemsData = await orderItemsResponse.json();
  
        // Update item quantities in the database
        for (const item of items) {
          await csrfFetch(`/api/items/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantityOnHand: item.quantityOnHand - item.quantity }),
          });
        }
  
        const completeOrder = { ...orderData.order, orderItems: orderItemsData.orderItems };
  
        // Dispatch an action to fetch all orders after creating a new one
        dispatch(fetchUserOrders(orderData.order.userId));
  
        return completeOrder;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], currentOrder: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload); // Add the new order to the beginning of the orders array
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders; // Make sure this matches your API response structure
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
