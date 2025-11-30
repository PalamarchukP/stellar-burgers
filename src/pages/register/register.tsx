import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '@store';
import { RegisterUI } from '@ui-pages';
import { registerUser, userIsLoadingSelect } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const isLoading = useSelector(userIsLoadingSelect);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .catch((err: any) => setErrorText(err || 'Ошибка регистрации'));
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
      // isLoading={isLoading}
    />
  );
};
