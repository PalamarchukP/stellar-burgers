import { TOrder } from '@utils-types';

export type FeedInfoUIProps = {
  feed: TFeedColumns;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};

export type TFeedColumns = {
  total: number;
  totalToday: number;
  orders?: TOrder[];
  isLoading?: boolean;
  error?: string | null;
};
