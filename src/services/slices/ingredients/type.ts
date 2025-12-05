import { TIngredient } from '@utils-types';

export interface IngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}
