import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { FC } from 'react';

export const OrderModal: FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  return (
    <Modal title={`Детали заказа #${number}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};
