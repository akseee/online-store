import { expect, test } from '@jest/globals';
import { userReducer, userSlice } from '../slices/user';
import { ingredientsReducer, ingredientsSlice } from '../slices/ingredients';
import { orderReducer, orderSlice } from '../slices/order';
import { feedReducer, feedSlice } from '../slices/feed';
import {
  burgerConstructor,
  burgerConstructorReducer
} from '../slices/burgerConstructor';
import { rootReducer } from '../store';

test('Test of the rootReducer:', () => {
  const mockAction = { type: 'UNKNOWN_ACTION' };
  const actualState = rootReducer(undefined, mockAction);
  const expectedResult = {
    [userSlice.name]: userReducer(undefined, mockAction),
    [feedSlice.name]: feedReducer(undefined, mockAction),
    [orderSlice.name]: orderReducer(undefined, mockAction),
    [ingredientsSlice.name]: ingredientsReducer(undefined, mockAction),
    [burgerConstructor.name]: burgerConstructorReducer(undefined, mockAction)
  };

  expect(actualState).toEqual(expectedResult);
});
