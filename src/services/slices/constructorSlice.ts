import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.constructorIngredients];

      if (fromIndex < 0 || fromIndex >= ingredients.length) return;
      if (toIndex < 0 || toIndex >= ingredients.length) return;

      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);

      state.constructorIngredients = ingredients;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
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
