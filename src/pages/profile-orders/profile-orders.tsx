import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';

import { feedOrdersSelect } from '@slices';
import { ProfileOrdersUI } from '@ui-pages';
import { fetchProfileOrders } from '@thunks';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(feedOrdersSelect);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, user]);

  return <ProfileOrdersUI orders={userOrders} />;
};
