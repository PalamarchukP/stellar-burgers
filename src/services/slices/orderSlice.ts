import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderByNumber, sendOrderThunk } from '@thunks';

import { TOrder } from '@utils-types';

export interface OrderState {
  // Для создания нового заказа (конструктор бургеров)
  newOrder: TOrder | null;
  newOrderRequest: boolean;
  // Для просмотра заказа по ID (страница деталей)
  currentOrder: TOrder | null;
  // requestStatus: RequestStatus;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  newOrder: null,
  newOrderRequest: false,

  currentOrder: null,
  // currentOrderData: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<TOrder>) {
      state.currentOrder = action.payload;
    },
    clearNewOrder(state, action: PayloadAction<void>) {
      state.newOrder = null;
    },
    clearCurrentOrder(state, action: PayloadAction<void>) {
      state.currentOrder = null;
    },
    clearOrderRequest(state, action: PayloadAction<void>) {
      state.newOrderRequest = false;
    }
  },
  selectors: {
    newOrderSelect: (sliceState: OrderState) => sliceState.newOrder,
    newOrderRequestSelect: (sliceState: OrderState) =>
      sliceState.newOrderRequest,
    currentOrderSelect: (sliceState: OrderState) => sliceState.currentOrder,
    currentOrderLoadingSelect: (sliceState: OrderState) => sliceState.loading,
    orderIsLoadingSelect: (sliceState: OrderState) => sliceState.loading
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.loading = true;
        state.newOrderRequest = true;
        state.error = null;
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.newOrderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload.order;
        state.newOrderRequest = false;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      });
  }
});

export const {
  setCurrentOrder,
  clearNewOrder,
  clearCurrentOrder,
  clearOrderRequest
} = orderSlice.actions;

export const {
  newOrderSelect,
  newOrderRequestSelect,
  currentOrderSelect,
  currentOrderLoadingSelect,
  orderIsLoadingSelect
} = orderSlice.selectors;

export default orderSlice;
