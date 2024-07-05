import { RequestStatus } from '@utils-types';
import { TInitialState, feedReducer, getFeedData } from '../slices/feed';
const mockOrder1 = {
  _id: '1',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2024-06-30T11:58:54.878Z',
  updatedAt: '2024-06-30T11:58:55.297Z',
  number: 1
};

const mockOrder2 = {
  _id: '2',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0941'
  ],
  status: 'done',
  name: 'Краторный био-марсианский люминесцентный бургер',
  createdAt: '2024-06-30T10:51:01.836Z',
  updatedAt: '2024-06-30T10:51:02.260Z',
  number: 2
};

const mockFeedResponse = {
  success: true,
  orders: [mockOrder1, mockOrder2],
  total: 2,
  totalToday: 2
};

describe('Reducers of the slice [feedSlice]:', () => {
  const initialState: TInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    requestStatus: RequestStatus.IDLE
  };
  test('[getFeedData]: should ', () => {
    const actualState = feedReducer(
      { ...initialState, requestStatus: RequestStatus.LOADING },
      getFeedData.fulfilled(mockFeedResponse, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      orders: [mockOrder1, mockOrder2],
      total: 2,
      totalToday: 2,
      requestStatus: RequestStatus.SUCCESS
    });
  });
});
