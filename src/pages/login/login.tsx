import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '@store';
import { LoginUI } from '@ui-pages';
import { loginUser } from '@thunks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(loginUser({ email, password }))
      .unwrap()
      .catch((err) => setErrorText(err.message || 'Ошибка авторизации'));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
