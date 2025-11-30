import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder, TOrdersData } from '@utils-types';
import { getIngredientsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { useDispatch } from '@store';
import { clearConstructor } from '@slices';

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

export const sendOrderThunk = createAsyncThunk(
  '/order/create',
  async (ingredients: string[], { rejectWithValue, dispatch }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (response.success) {
        dispatch(clearConstructor());
      }
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  '/order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
        state.currentOrder = action.payload.order;
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

export const { setCurrentOrder, clearNewOrder, clearCurrentOrder } =
  orderSlice.actions;

export const {
  newOrderSelect,
  newOrderRequestSelect,
  currentOrderSelect,
  currentOrderLoadingSelect,
  orderIsLoadingSelect
} = orderSlice.selectors;

export default orderSlice;
