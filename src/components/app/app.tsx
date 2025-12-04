import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useDispatch } from '@store';
import { FC, useEffect } from 'react';
import { AppRouter } from '../app-router/app-router';
import { fetchIngredientsThunk, fetchUser } from '@thunks';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
