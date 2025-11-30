import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchUser } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  const orders = user?.email || [];

  return null;
  // return <ProfileOrdersUI orders={orders} />;
};
