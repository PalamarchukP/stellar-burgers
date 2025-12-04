import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters, ...rest }, ref) => {
  console.log();
  return (
    <>
      <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref} {...rest}>
        {ingredients.map((ingredient, index) => {
          console.log();
          return (
            <BurgerIngredient
              ingredient={ingredient}
              key={ingredient._id}
              count={ingredientsCounters[ingredient._id]}
            />
          );
        })}
      </ul>
    </>
  );
});
