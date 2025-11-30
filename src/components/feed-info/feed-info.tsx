import { FC } from 'react';
import { useSelector } from '@store';
import { feedSelect } from '@slices';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(feedSelect);

  const orders = feed?.orders ?? [];

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{
        total: feed?.total ?? 0,
        totalToday: feed?.totalToday ?? 0
      }}
    />
  );
};
