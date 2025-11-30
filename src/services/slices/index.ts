// constructorSlice
export {
  moveIngredient,
  addIngredient,
  removeIngredient,
  clearConstructor,
  constructorBurgerElement,
  constructorBurgerIsBun,
  constructorBurgerIsIngredients
} from './constructorSlice';
export { default as constructorSlice } from './constructorSlice';

// productSlice
export { getIngredients, productsIsLoading } from './ingredientsSlice'; // <-- если productSlice в ingredientsSlice?
export { default as ingredientsSlice } from './ingredientsSlice';

// orderSlice
export {
  setCurrentOrder,
  clearNewOrder,
  clearCurrentOrder,
  newOrderSelect,
  newOrderRequestSelect,
  currentOrderSelect,
  currentOrderLoadingSelect,
  orderIsLoadingSelect
} from './orderSlice';
export { default as orderSlice } from './orderSlice';

// feedSlice
export { default as feedSlice } from './feedSlice';

// userSlice
export { default as userSlice } from './userSlice';

// thunks
export { sendOrderThunk, fetchOrderByNumber } from './orderSlice';

export { fetchIngredientsThunk } from './ingredientsSlice';
