import { test, describe } from '@jest/globals';
import {
  TInitialState,
  getIngredients,
  ingredientsActions,
  ingredientsReducer
} from '../slices/ingredients';
import { RequestStatus } from '../../utils/types';

const mockIngredient1 = {
  name: 'Ингредиент 1',
  _id: '2',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const mockIngredient2 = {
  name: 'Ингредиент 2',
  _id: '3',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const mockIngredient3 = {
  name: 'Ингредиент 3',
  _id: '4',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

describe('Reducers of the slice [ingredients]:', () => {
  const initialState: TInitialState = {
    ingredients: [],
    currentIngredient: null,
    requestStatus: RequestStatus.IDLE,
    error: null
  };
  const mockIngredientData = [
    mockIngredient1,
    mockIngredient2,
    mockIngredient3
  ];

  test('[setCurrentIngredient]: should set current ingredient', () => {
    const { setCurrentIngredient } = ingredientsActions;

    const actualState = ingredientsReducer(
      {
        ...initialState,
        ingredients: mockIngredientData
      },
      setCurrentIngredient(mockIngredient1._id)
    );

    expect(actualState).toEqual({
      ...initialState,
      ingredients: mockIngredientData,
      currentIngredient: mockIngredient1
    });
  });

  describe('Handling update state with ingredients data and its error', () => {
    test('[getIngredients]: should set loading status and set error to null', () => {
      const actualState = ingredientsReducer(
        {
          ...initialState,
          error: 'Test Error'
        },
        getIngredients.pending('')
      );

      expect(actualState).toEqual({
        ...initialState,
        requestStatus: RequestStatus.LOADING,
        error: null
      });
    });

    test('[getIngredients]: should update state with ingredients data, change loading status and set error to null', () => {
      const actualState = ingredientsReducer(
        {
          ...initialState,
          error: 'Test Error',
          requestStatus: RequestStatus.LOADING
        },
        getIngredients.fulfilled(mockIngredientData, '')
      );
      expect(actualState).toEqual({
        ...initialState,
        ingredients: mockIngredientData,
        requestStatus: RequestStatus.SUCCESS,
        error: null
      });
    });

    test('[getIngredients]: should set error and change status to failed', () => {
      const actualState = ingredientsReducer(
        { ...initialState, requestStatus: RequestStatus.LOADING, error: null },
        getIngredients.rejected(new Error('Test Error'), 'Test Error')
      );
      expect(actualState).toEqual({
        ...initialState,
        requestStatus: RequestStatus.FAILED,
        error: 'Test Error'
      });
    });
  });
});
