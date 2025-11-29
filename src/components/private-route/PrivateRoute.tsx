import { Navigate, Outlet, Route } from 'react-router-dom';

const PrivateRoute = () => {
  if (localStorage.getItem('accessToken')) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
