import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useDispatch } from '@store';
import { fetchIngredientsThunk } from '@slices';
import { FC, useEffect } from 'react';
import { AppRouter } from '../app-router/app-router';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
