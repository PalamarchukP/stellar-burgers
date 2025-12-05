import { TConstructorIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
}

export interface MoveIngredient {
  fromIndex: number;
  toIndex: number;
}
