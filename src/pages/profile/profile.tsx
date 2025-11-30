import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@store';
import { ProfileUI } from '@ui-pages';
import { userSelect, fetchUser, updateUser } from '@slices';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    } else {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [dispatch, user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError(null);

    dispatch(updateUser(formValue))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({ ...prev, password: '' }));
      })
      .catch((err: Error) => setUpdateUserError(err.message));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      // updateUserError={updateUserError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
