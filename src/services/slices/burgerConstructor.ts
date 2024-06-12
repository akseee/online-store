import { ingredientsActions } from './ingredients';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const sliceName = 'burgerConstructor';

type TInitialState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TInitialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructor = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredients: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      const ingredientToMove =
        state.constructorItems.ingredients[action.payload];

      if (index > 0) {
        state.constructorItems.ingredients.splice(action.payload, 1);
        state.constructorItems.ingredients.splice(
          index - 1,
          0,
          ingredientToMove
        );
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      const ingredientToMove =
        state.constructorItems.ingredients[action.payload];

      if (index < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients.splice(action.payload, 1);
        state.constructorItems.ingredients.splice(
          index + 1,
          0,
          ingredientToMove
        );
      }
    }
  },
  selectors: {
    getConstructorData: (state) => state.constructorItems
  }
});

export const burgerConstructorSelectors = burgerConstructor.selectors;
export const burgerConstructorActions = burgerConstructor.actions;
