import { TConstructorFields, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorFields;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
