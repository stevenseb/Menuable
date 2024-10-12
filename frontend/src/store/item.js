import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

// Thunk to fetch all items
export const fetchAllItems = createAsyncThunk(
  "menu/fetchAllItems",
  async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    return data.items;
  }
);

// Thunk to fetch menu items with onMenu: true
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    return data.items;
  }
);

// Thunk to add a new item
export const addItem = createAsyncThunk("menu/addItem", async (newItem) => {
  const response = await csrfFetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  const data = await response.json();
  return { ...data.item, imageFilename: newItem.imageFilename };
});

// Thunk to update an item's onMenu status
export const updateItemOnMenu = createAsyncThunk(
  "menu/updateItemOnMenu",
  async ({ id, onMenu }) => {
    const response = await csrfFetch(`/api/items/${id}/onMenu`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onMenu }),
    });
    const data = await response.json();
    return data.item;
  }
);

// Thunk to update an item's quantityOnHand
export const updateItemQuantity = createAsyncThunk(
  "menu/updateItemQuantity",
  async (payload) => {
    const items = Array.isArray(payload) ? payload : [payload];

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        if (item.quantityOnHand === undefined || item.quantityOnHand === null) {
          throw new Error(`Invalid quantityOnHand for item ${item.id}`);
        }

        const response = await csrfFetch(`/api/items/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantityOnHand: item.quantityOnHand }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to update item ${item.id}: ${errorData.message}`
          );
        }

        return response.json();
      })
    );

    return updatedItems;
  }
);

// Thunk to delete an item
export const deleteItem = createAsyncThunk("menu/deleteItem", async (id) => {
  await csrfFetch(`/api/items/${id}`, { method: "DELETE" });
  return id;
});

// Slice
const itemsSlice = createSlice({
  name: "menu",
  initialState: { items: [], status: "idle", error: null, localInventory: {} },
  reducers: {
    updateItemRating: (state, action) => {
      const { itemId, newRating } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.stars += newRating;
        item.numRatings += 1;
      }
    },
    updateLocalInventory: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (state.localInventory[itemId] !== undefined) {
        state.localInventory[itemId] -= quantity;
      }
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantityOnHand -= quantity;
      }
    },
    resetLocalInventory: (state) => {
      state.localInventory = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((item) => ({
          ...item,
          imageUrl: item.imageFilename
            ? `https://comideria-russa.b-cdn.net/${item.imageFilename}`
            : "default-image-url.jpg",
        }));
        state.localInventory = action.payload.reduce((acc, item) => {
          acc[item.id] = item.quantityOnHand;
          return acc;
        }, {});
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push({
          ...action.payload,
          imageUrl: action.payload.imageFilename
            ? `https://comideria-russa.b-cdn.net/${action.payload.imageFilename}`
            : "default-image-url.jpg",
        });
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateItemOnMenu.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
            imageUrl: action.payload.imageFilename
              ? `https://comideria-russa.b-cdn.net/${action.payload.imageFilename}`
              : "default-image-url.jpg",
          };
        }
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const updatedItems = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        updatedItems.forEach((updatedItem) => {
          const index = state.items.findIndex(
            (item) => item.id === updatedItem.id
          );
          if (index !== -1) {
            state.items[index] = { ...state.items[index], ...updatedItem };
            state.localInventory[updatedItem.id] = updatedItem.quantityOnHand;
          }
        });
      });
  },
});

export const { updateItemRating, updateLocalInventory, resetLocalInventory } =
  itemsSlice.actions;

export default itemsSlice.reducer;
