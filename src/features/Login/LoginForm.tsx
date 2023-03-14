import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setUser } from '../Auth';
import { useAppDispatch } from '../../hooks';

interface UserCredentialInputs {
  username: string,
  password: string,
}

function LoginForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCredentialInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<UserCredentialInputs> = async (formData: UserCredentialInputs) => {
    try {
      setLoading(true);

      const { username, password } = formData;
      const userSession = await loginService.login({ username, password });

      dispatch(setUser({ user: userSession }));

      reset({
        username: '',
        password: '',
      });
    } catch (error: unknown) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="username-input" aria-label="username" {...register('username', { required: true })} />
      <input id="password-input" aria-label="password" {...register('password', { required: true })} />
      <Button type="submit" loading={loading} />
    </form>
  );
}

export default LoginForm;
