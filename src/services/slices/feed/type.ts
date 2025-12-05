import { TOrder, TOrdersData } from '@utils-types';

export type FeedsState = {
  feed: TOrdersData | null;
  ordersAuth: TOrder[];

  feedRequest: boolean;
  feedError: string | null;

  profileOrdersRequest: boolean;
  profileOrdersError: string | null;
};
