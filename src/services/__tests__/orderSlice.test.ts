import { expect, test, describe } from '@jest/globals';
import {
  TInitialState,
  getOrderData,
  orderActions,
  orderReducer,
  postOrderData
} from '../slices/order';
import { RequestStatus } from '@utils-types';

const mockOrder1 = {
  _id: '1',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa0942'
  ],
  status: 'done',
  name: 'Краторный space spicy минеральный бургер',
  createdAt: '2024-06-11T17:54:26.040Z',
  updatedAt: '2024-06-11T17:54:26.445Z',
  number: 1
};
const mockOrder2 = {
  _id: '2',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный space био-марсианский spicy люминесцентный бургер',
  createdAt: '2024-06-12T08:59:59.099Z',
  updatedAt: '2024-06-12T08:59:59.493Z',
  number: 2
};
const mockOrder3 = {
  _id: '3',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0943'
  ],
  status: 'done',
  name: 'Астероидный space флюоресцентный spicy бургер',
  createdAt: '2024-06-25T10:03:03.694Z',
  updatedAt: '2024-06-25T10:03:04.113Z',
  number: 3
};
const mockOrders = {
  success: true,
  orders: [mockOrder1, mockOrder2, mockOrder3]
};
const mockUserOrderInfo = {
  success: true,
  order: {
    _id: '4',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943'
    ],
    owner: '662f5b4197ede0001d0681b1',
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-06-25T10:03:03.694Z',
    updatedAt: '2024-06-25T10:03:04.113Z',
    number: 4,
    __v: 0
  },
  name: 'Space флюоресцентный бургер'
};

describe('Reducers of the slice [orderSlice]:', () => {
  const initialState: TInitialState = {
    orderInfo: null,
    userOrdersInfo: [],
    orderRequest: false,
    orderModalData: null,
    requestStatus: RequestStatus.IDLE
  };

  test('[removeOrderData]: should delete order information', () => {
    const { removeOrderData } = orderActions;
    const currentState = orderReducer(
      { ...initialState, orderInfo: mockUserOrderInfo.order },
      removeOrderData()
    );

    expect(currentState).toEqual({
      ...initialState,
      orderInfo: null
    });
  });

  test('[getOrderData]: should set order information on success', () => {
    const currentState = orderReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.LOADING
      },
      getOrderData.fulfilled(mockOrders, '', 0)
    );
    expect(currentState).toEqual({
      ...initialState,
      orderInfo: mockOrders.orders[0],
      requestStatus: RequestStatus.SUCCESS
    });
  });
  test('[postOrderData]: should save user order data on success', () => {
    const currentState = orderReducer(
      {
        ...initialState,
        orderRequest: true,
        requestStatus: RequestStatus.LOADING
      },
      postOrderData.fulfilled(mockUserOrderInfo, '', ['mockId', 'mockId'])
    );

    expect(currentState).toEqual({
      ...initialState,
      orderModalData: mockUserOrderInfo.order,
      requestStatus: RequestStatus.SUCCESS,
      orderRequest: false
    });
  });

  test('[postOrderData]: should set request status to loading', () => {
    const currentState = orderReducer(
      initialState,
      postOrderData.pending('', ['mockId', 'mockId'])
    );

    expect(currentState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.LOADING,
      orderRequest: true
    });
  });
});
