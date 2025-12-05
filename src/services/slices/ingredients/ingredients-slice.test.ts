import ingredientsSlice from './ingredientsSlice';
import { TIngredient } from '@utils-types';
import { fetchIngredientsThunk } from '@thunks';
import { IngredientState } from './type';

describe('ingredientsSlice', () => {
  const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const testIngredient: TIngredient = {
    _id: '1',
    name: 'Lettuce',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 1,
    calories: 5,
    price: 20,
    image: 'lettuce.png',
    image_large: 'lettuce_large.png',
    image_mobile: 'lettuce_mobile.png'
  };

  it('loading = true и error = null при fetchIngredientsThunk.pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredientsThunk.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('ingredients обновляются и loading = false при fetchIngredientsThunk.fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredientsThunk.fulfilled([testIngredient], '', undefined)
    );

    expect(state.ingredients).toEqual([testIngredient]);
    expect(state.loading).toBe(false);
  });

  it('loading = false и error обновляется при fetchIngredientsThunk.rejected', () => {
    const error = new Error('Ошибка загрузки ингредиентов');

    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredientsThunk.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
