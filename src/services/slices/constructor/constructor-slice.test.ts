import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { ConstructorState } from './type';

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    constructorIngredients: []
  };

  const testBun: TConstructorIngredient = {
    _id: 'bun1',
    id: 'bun1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    price: 100,
    image: 'bun.png',
    image_large: 'bun_large.png',
    image_mobile: 'bun_mobile.png'
  };

  const testIngredient1: TConstructorIngredient = {
    _id: 'i1',
    id: 'i1',
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

  const testIngredient2: TConstructorIngredient = {
    _id: 'i2',
    id: 'i2',
    name: 'Tomato',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 2,
    calories: 10,
    price: 25,
    image: 'tomato.png',
    image_large: 'tomato_large.png',
    image_mobile: 'tomato_mobile.png'
  };

  it('добавляет булку через addIngredient', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(testBun)
    );
    expect(state.bun).toEqual(testBun);
    expect(state.constructorIngredients.length).toBe(0);
  });

  it('добавляет ингредиент через addIngredient', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(testIngredient1)
    );
    expect(state.constructorIngredients).toEqual([testIngredient1]);
    expect(state.bun).toBeNull();
  });

  it('удаляет ингредиент по id через removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorIngredients: [testIngredient1, testIngredient2]
    };
    const state = constructorSlice.reducer(
      stateWithIngredients,
      removeIngredient('i1')
    );
    expect(state.constructorIngredients).toEqual([testIngredient2]);
  });

  it('перемещает ингредиент через moveIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorIngredients: [testIngredient1, testIngredient2]
    };
    const state = constructorSlice.reducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.constructorIngredients).toEqual([
      testIngredient2,
      testIngredient1
    ]);
  });

  it('очищает конструктор через clearConstructor', () => {
    const stateWithBunAndIngredients = {
      bun: testBun,
      constructorIngredients: [testIngredient1, testIngredient2]
    };
    const state = constructorSlice.reducer(
      stateWithBunAndIngredients,
      clearConstructor()
    );
    expect(state.bun).toBeNull();
    expect(state.constructorIngredients).toEqual([]);
  });
});
