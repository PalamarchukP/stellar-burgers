import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { fetchUser, userSelect, isAuthCheckedSelect } from '@slices';
import { Preloader } from '@ui';

const PrivateRoute: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const isAuthChecked = useSelector(isAuthCheckedSelect);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.includes('accessToken');
    if (token && !user) {
      dispatch(fetchUser())
        .unwrap()
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading || !isAuthChecked) {
    return <Preloader />;
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
