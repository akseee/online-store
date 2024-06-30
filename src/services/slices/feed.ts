import { userReducer } from './user';
import { TFeedsResponse } from './../../utils/burger-api';
import { RequestStatus, TOrder } from './../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as burgerApi from '@api';

const sliceName = 'feed';

export const getFeedData = createAsyncThunk<
  TFeedsResponse,
  void,
  { extra: typeof burgerApi }
>(
  `${sliceName}/getFeedData`,
  async (_, { extra: api }) => await api.getFeedsApi()
);

export type TInitialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
};

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.IDLE
};

export const feedSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    getFeedStatusSelector: (state) => state.requestStatus
  },
  extraReducers: (builder) =>
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.requestStatus = RequestStatus.SUCCESS;
    })
});

export const feedReducer = feedSlice.reducer;
export const feedSelectors = feedSlice.selectors;
export const feedActions = feedSlice.actions;
