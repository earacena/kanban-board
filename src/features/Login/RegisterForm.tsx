import { Button, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Auth';
import { useAppDispatch } from '../../hooks';
import userService from '../../services/user.service';

interface NewUserCredentialInputs {
  name: string,
  username: string;
  password: string;
}

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUserCredentialInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<NewUserCredentialInputs> = async (
    formData: NewUserCredentialInputs,
  ) => {
    try {
      setLoading(true);

      const { name, username, password } = formData;
      const userSession = await userService.create({ name, username, password });

      dispatch(setUser({ user: userSession }));

      reset({
        username: '',
        password: '',
      });
      navigate('/');
    } catch (error: unknown) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="name-input"
        aria-label="name"
        {...register('name', { required: true })}
        error={
          errors.name?.type === 'required' && (
            <Text color="red" size="sm">
              Please enter a name
            </Text>
          )
        }
      />
      <TextInput
        id="username-input"
        aria-label="username"
        {...register('username', { required: true })}
        error={
          errors.username?.type === 'required' && (
            <Text color="red" size="sm">
              Please enter a username
            </Text>
          )
        }
      />
      <TextInput
        id="password-input"
        aria-label="password"
        error={
          errors.username?.type === 'required' && (
            <Text color="red" size="sm">
              Please enter a username
            </Text>
          )
        }
        {...register('password', { required: true })}
      />
      <Button type="submit" loading={loading} />
    </form>
  );
}

export default RegisterForm;
