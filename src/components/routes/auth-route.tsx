import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { userSelect, isAuthCheckedSelect } from '@slices';
import { Preloader } from '@ui';
import { fetchUser } from '@thunks';

type RouteType = 'private' | 'public';

interface IAuthRouteProps {
  type?: RouteType;
  redirectPath?: string;
}

const AuthRoute: FC<IAuthRouteProps> = ({ type = 'private', redirectPath }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const isAuthChecked = useSelector(isAuthCheckedSelect);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenExists = document.cookie.includes('accessToken');
    if (tokenExists && !user) {
      dispatch(fetchUser())
        .unwrap()
        .catch(() => {}) // игнорируем ошибки
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) return <Preloader />;

  if (type === 'private') {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to={redirectPath || '/login'} replace />
    );
  } else {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to={redirectPath || '/profile'} replace />
    );
  }
};

export default AuthRoute;
