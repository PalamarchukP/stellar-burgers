import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
}

export interface MoveIngredient {
  ingredient: TConstructorIngredient;
  from: number;
  to: number;
}

const initialState: ConstructorState = {
  bun: null,
  constructorIngredients: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    moveIngredient(state, action: PayloadAction<MoveIngredient>) {
      state.constructorIngredients.splice(action.payload.from, 1);
      state.constructorIngredients.splice(
        action.payload.to,
        0,
        action.payload.ingredient
      );
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      console.log(action.payload);
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else state.constructorIngredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const removedIngredient = state.constructorIngredients.find(
        (el) => el.id === action.payload
      );
      if (!removedIngredient) return;
      const index = state.constructorIngredients.indexOf(removedIngredient);
      state.constructorIngredients.splice(index, 1);
    },
    clearConstructor(state) {
      state.bun = null;
      state.constructorIngredients = [];
    }
  },
  selectors: {
    constructorBurgerElement: (sliceState: ConstructorState) => ({
      bun: sliceState.bun,
      ingredients: sliceState.constructorIngredients
    }),
    constructorBurgerIsBun: (sliceState: ConstructorState) => ({
      bun: sliceState.bun
    }),
    constructorBurgerIsIngredients: (sliceState: ConstructorState) => ({
      ingredients: sliceState.constructorIngredients
    })
  }
});

export const {
  moveIngredient,
  addIngredient,
  removeIngredient,
  clearConstructor
} = constructorSlice.actions;

export const {
  constructorBurgerElement,
  constructorBurgerIsBun,
  constructorBurgerIsIngredients
} = constructorSlice.selectors;

export default constructorSlice;
