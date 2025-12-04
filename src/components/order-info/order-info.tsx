import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { currentOrderSelect, getIngredients } from '@slices';
import { useParams } from 'react-router-dom';
import { fetchIngredientsThunk, fetchOrderByNumber } from '@thunks';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(getIngredients);
  const orderData = useSelector(currentOrderSelect);

  useEffect(() => {
    if (number) {
      const num = Number(number);
      if (!orderData || orderData.number !== num) {
        dispatch(fetchOrderByNumber(num));
      }
    }
    if (!ingredients.length) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, number, orderData, ingredients.length]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
