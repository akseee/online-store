import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { orderSelectors } from '../../services/slices/order';
import { feedSelectors } from '../../services/slices/feed';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { getOrdersSelector, getTotalSelector, getTotalTodaySelector } =
    feedSelectors;

  const orders = useSelector(getOrdersSelector);
  const feed = {
    total: useSelector(getTotalSelector),
    totalToday: useSelector(getTotalTodaySelector)
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
