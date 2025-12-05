import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderByNumber, sendOrderThunk } from '@thunks';
import { TOrder } from '@utils-types';
import { OrderState } from './type';

const initialState: OrderState = {
  newOrder: null,
  newOrderRequest: false,
  newOrderError: null,

  currentOrder: null,
  currentOrderRequest: false,
  currentOrderError: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<TOrder>) {
      state.currentOrder = action.payload;
    },
    clearNewOrder(state) {
      state.newOrder = null;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    clearOrderRequest(state) {
      state.newOrderRequest = false;
    }
  },

  selectors: {
    newOrderSelect: (orderState) => orderState.newOrder,
    newOrderRequestSelect: (orderState) => orderState.newOrderRequest,
    newOrderErrorSelect: (orderState) => orderState.newOrderError,

    currentOrderSelect: (orderState) => orderState.currentOrder,
    currentOrderRequestSelect: (orderState) => orderState.currentOrderRequest,
    currentOrderErrorSelect: (orderState) => orderState.currentOrderError
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.newOrderRequest = true;
        state.newOrderError = null;
      })

      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        state.newOrderRequest = false;
        state.newOrder = action.payload.order;
      })

      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.newOrderRequest = false;
        state.newOrderError = action.error.message ?? 'Ошибка создания заказа';
      });

    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrderRequest = true;
        state.currentOrderError = null;
      })

      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrderRequest = false;
        state.currentOrder = action.payload;
      })

      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.currentOrderRequest = false;
        state.currentOrderError =
          action.error.message ?? 'Ошибка загрузки заказа';
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
  newOrderErrorSelect,
  currentOrderSelect,
  currentOrderRequestSelect,
  currentOrderErrorSelect
} = orderSlice.selectors;

export default orderSlice;
