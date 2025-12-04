import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { userSelect } from '@slices';
import { Preloader } from '@ui';
import { fetchUser } from '@thunks';

type RouteType = 'private' | 'public';

interface IAuthRouteProps {
  type?: RouteType;
  redirectPath?: string;
}

export const AuthRoute: FC<IAuthRouteProps> = ({
  type = 'private',
  redirectPath
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenExists = document.cookie.includes('accessToken');
    if (tokenExists && !user) {
      dispatch(fetchUser())
        .unwrap()
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) return <Preloader />;

  if (type === 'private') {
    if (!user) {
      return (
        <Navigate to='/login' replace state={{ from: location.pathname }} />
      );
    }
    return <Outlet />;
  }

  if (user) {
    const redirectTo = location.state?.from || redirectPath || '/';
    navigate(redirectTo);
  }

  return <Outlet />;
};

export default AuthRoute;
