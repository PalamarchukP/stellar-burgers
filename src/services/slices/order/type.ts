import { TOrder } from '@utils-types';

export interface OrderState {
  newOrder: TOrder | null;
  newOrderRequest: boolean;
  newOrderError: string | null;

  currentOrder: TOrder | null;
  currentOrderRequest: boolean;
  currentOrderError: string | null;
}
