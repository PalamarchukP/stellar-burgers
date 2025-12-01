import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '@store';
import { LoginUI } from '@ui-pages';
import { userIsLoadingSelect } from '@slices';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@thunks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const isLoading = useSelector(userIsLoadingSelect);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err: any) => setErrorText(err.message || 'Ошибка авторизации'));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      // isLoading={isLoading}
    />
  );
};
