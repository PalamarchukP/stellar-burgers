import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearOrderRequest,
  constructorBurgerElement,
  clearNewOrder,
  newOrderRequestSelect,
  newOrderSelect,
  userSelect,
  clearCurrentOrder
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { sendOrderThunk } from '@thunks';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(constructorBurgerElement);
  const orderRequest = useSelector(newOrderRequestSelect);
  const orderModalData = useSelector(newOrderSelect);
  const user = useSelector(userSelect);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id),
      constructorItems.bun._id
    ];
    dispatch(sendOrderThunk(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearNewOrder());
    dispatch(clearCurrentOrder());
    dispatch(clearOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
