import { FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import AuthRoute from '../routes/auth-route';

export const AppRouter: FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/feed/:number'
        element={
          <Modal title='Детали заказа' onClose={() => navigate(-1)}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
            <IngredientDetails />
          </Modal>
        }
      />

      <Route element={<AuthRoute type='public' />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>

      <Route element={<AuthRoute type='private' />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
};
