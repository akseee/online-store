import { TOrderResponse, TNewOrderResponse } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { RequestStatus, TOrder } from '@utils-types';

const sliceName = 'orders';

export const getUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { extra: typeof burgerApi }
>(
  `${sliceName}/getUserOrders`,
  async (_, { extra: api }) => await api.getOrdersApi()
);

export const getOrderData = createAsyncThunk<
  TOrderResponse,
  number,
  { extra: typeof burgerApi }
>(
  `${sliceName}/getOrderData`,
  async (orderNumber, { extra: api }) =>
    await api.getOrderByNumberApi(orderNumber)
);

export const postOrderData = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { extra: typeof burgerApi }
>(
  `${sliceName}/postOrderData`,
  async (orderData, { extra: api }) => await api.orderBurgerApi(orderData)
);

export type TInitialState = {
  orderInfo: TOrder | null;
  userOrdersInfo: TOrder[];
  orderRequest: boolean;
  orderModalData: null | TOrder;
  requestStatus: RequestStatus;
};

const initialState: TInitialState = {
  orderInfo: null,
  userOrdersInfo: [],
  orderRequest: false,
  orderModalData: null,
  requestStatus: RequestStatus.IDLE
};

export const orderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    removeOrderData: (state) => {
      state.orderInfo = null;
    },
    setOrderData: (state, action) => {
      state.orderInfo = action.payload;
      console.log(action.payload);
    },
    removeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getUserOrdersInfoSelector: (state) => state.userOrdersInfo,
    getOrderSelector: (state) => state.orderInfo,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData,
    getOrderStatusSelector: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.userOrdersInfo = action.payload;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.requestStatus = RequestStatus.FAILED;
    });

    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.orderInfo = action.payload.orders[0];
    });
    builder.addCase(getOrderData.pending, (state) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addCase(getOrderData.rejected, (state) => {
      state.requestStatus = RequestStatus.FAILED;
    });

    builder.addCase(postOrderData.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.orderModalData = action.payload.order;
      state.orderRequest = false;
    });
    builder.addCase(postOrderData.pending, (state) => {
      state.requestStatus = RequestStatus.LOADING;
      state.orderRequest = true;
    });
    builder.addCase(postOrderData.rejected, (state) => {
      state.requestStatus = RequestStatus.FAILED;
      state.orderRequest = true;
    });
  }
});

export const orderReducer = orderSlice.reducer;
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
