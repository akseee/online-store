import { expect, test, describe } from '@jest/globals';
import { TInitialState } from '../slices/order';
import { RequestStatus } from '@utils-types';

const mockOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',

        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Краторный space spicy минеральный бургер',
      createdAt: '2024-06-11T17:54:26.040Z',
      updatedAt: '2024-06-11T17:54:26.445Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Флюоресцентный space био-марсианский spicy люминесцентный бургер',
      createdAt: '2024-06-12T08:59:59.099Z',
      updatedAt: '2024-06-12T08:59:59.493Z',
      number: 2
    },
    {
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
    }
  ]
};
const mockUserOrdersInfo = {
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
  test('test', () => {
    expect(12).toEqual(12);
  });
});
