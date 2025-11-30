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
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorIngredients.splice(action.payload, 1);
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

// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// import { TIngredient, TConstructorIngredient } from '@utils-types';
// import { getIngredientsApi } from '@api';

// export interface ProductState {
//   bun: TIngredient | null;
//   constructorIngredients: TConstructorIngredient[];
// }

// const initialState: ProductState = {
//   bun: null,
//   constructorIngredients: [],
// };

// const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     //ингридиенты
//     addIngredient(state, action: PayloadAction<TIngredient>) {
//       state.ingredients.push(action.payload);
//     },
//     removeIngredient(state, action: PayloadAction<TIngredient>) {
//       state.ingredients = state.ingredients.filter(
//         (ingredient) => ingredient._id !== action.payload._id
//       );
//     },

//     //конструктор
//     setBun(state, action: PayloadAction<TIngredient>) {
//       state.bun = action.payload;
//     },
//     addConstructorIngredient(
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) {
//       state.constructorIngredients.push(action.payload);
//     },
//     removeConstructorIngredient(state, action: PayloadAction<number>) {
//       state.constructorIngredients.splice(action.payload, 1);
//     },
//     clearConstructor(state) {
//       state.bun = null;
//       state.constructorIngredients = [];
//     },

//     //заказ
//     setOrderRequest(state, action: PayloadAction<boolean>) {
//       state.orderRequest = action.payload;
//     },
//     setOrderModalData(state, action: PayloadAction<any | null>) {
//       state.orderModalData = action.payload;
//     }
//   },
//   selectors: {
//     getIngredients: (sliceState: ProductState) => sliceState.ingredients,
//     productsIsLoading: (sliceState: ProductState) => sliceState.loading,

//     getConstructorItems: (sliceState: ProductState) => ({
//       bun: sliceState.bun,
//       ingredients: sliceState.constructorIngredients
//     }),

//     getOrderRequest: (sliceState: ProductState) => sliceState.orderRequest,
//     getOrderModalData: (sliceState: ProductState) => sliceState.orderModalData
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ingredients = action.payload;
//       });
//   }
// });

// export const {
//   addIngredient,
//   removeIngredient,
//   setBun,
//   addConstructorIngredient,
//   removeConstructorIngredient,
//   clearConstructor,
//   setOrderRequest,
//   setOrderModalData
// } = productSlice.actions;

// export const {
//   getIngredients,
//   productsIsLoading,
//   getConstructorItems,
//   getOrderRequest,
//   getOrderModalData
// } = productSlice.selectors;

// export default productSlice.reducer;
