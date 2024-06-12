import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import * as burgerApi from '@api';
import { userSlice } from './slices/user';
import { ingredientsSlice } from './slices/ingredients';
import { orderSlice } from './slices/order';
import { feedSlice } from './slices/feed';
import { burgerConstructor } from './slices/burgerConstructor';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructor.name]: burgerConstructor.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: burgerApi
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
