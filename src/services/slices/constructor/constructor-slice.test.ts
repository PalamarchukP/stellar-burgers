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
    _id: '2',
    id: 'bun1',
    name: 'Булка розовая',
    type: 'bun',
    proteins: 10,
    fat: 26,
    carbohydrates: 57,
    calories: 270,
    price: 120,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const testIngredient1: TConstructorIngredient = {
    _id: '3',
    id: 'i1',
    name: 'Начинка 1',
    type: 'main',
    proteins: 12,
    fat: 30,
    carbohydrates: 63,
    calories: 500,
    price: 270,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const testIngredient2: TConstructorIngredient = {
    _id: '4',
    id: 'i2',
    name: 'Начинка 2',
    type: 'main',
    proteins: 15,
    fat: 28,
    carbohydrates: 75,
    calories: 570,
    price: 310,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/meat/main-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/meat/main-02-large.png'
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
