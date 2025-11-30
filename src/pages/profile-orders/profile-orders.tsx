import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';

import { feedOrdersSelect, fetchProfileOrders } from '@slices';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(feedOrdersSelect);
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, user]);

  return <ProfileOrdersUI orders={userOrders} />;
};
