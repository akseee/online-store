import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import * as burgerApi from '@api';

const sliceName = 'ingredients';

export const getIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { extra: typeof burgerApi }
>(
  `${sliceName}/getIngredients`,
  async (_, { extra: api }) => await api.getIngredientsApi()
);

type TInitialState = {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  requestStatus: RequestStatus;
  error: string | null;
};

const initialState: TInitialState = {
  ingredients: [],
  currentIngredient: null,
  requestStatus: RequestStatus.IDLE,
  error: null
};

export const ingredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient =
        state.ingredients.find(
          (ingredient) => ingredient._id === action.payload
        ) || null;
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getCurrentIngredientSelector: (state) => state.currentIngredient,
    getIngredientStatusSelector: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.SUCCESS;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredients.pending, (state) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.requestStatus = RequestStatus.FAILED;
    });
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;
