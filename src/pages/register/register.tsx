import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '@store';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@thunks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => setErrorText(err || 'Ошибка авторизации'));
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
