/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Button, Divider, Stack, Text, TextInput,
} from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Auth';
import { useAppDispatch } from '../../hooks';
import loginService from '../../services/login.service';
import decodeWith from '../../util/decode';
import { ErrorType } from './types/registerForm.types';
import { notifications } from '@mantine/notifications';
import { BsX } from 'react-icons/bs';

interface UserCredentialInputs {
  username: string;
  password: string;
}

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<UserCredentialInputs> = async (
    formData: UserCredentialInputs,
  ) => {
    try {
      setLoading(true);

      const { username, password } = formData;
      const userSession = await loginService.login({ username, password });

      dispatch(setUser({ user: userSession }));

      reset({
        username: '',
        password: '',
      });
      navigate('/');
    } catch (error: unknown) {
      const decoded = decodeWith(ErrorType)(error);
      let message: string = '';

      if (decoded.message.includes('NetworkError')) {
        message = 'Unable to connect to server';
      } else if (decoded.message.includes('invalid credentials')) {
        message = 'Incorrect credentials, please try again.';
      }

      notifications.show({
        title: 'Error while logging in',
        icon: <BsX />,
        color: 'red',
        message,
      });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        css={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '16px',
        }}
      >
        <TextInput
          id="username-input"
          label="Username"
          aria-label="username"
          {...register('username', { required: true })}
          error={
            errors.username?.type === 'required' ? (
              <Text color="red" size="sm">
                Please enter a username
              </Text>
            ) : (
              false
            )
          }
          size="lg"
          radius="md"
        />
        <TextInput
          id="password-input"
          label="Password"
          aria-label="password"
          type="password"
          error={
            errors.password?.type === 'required' ? (
              <Text color="red" size="sm">
                Please enter a password
              </Text>
            ) : (
              false
            )
          }
          {...register('password', { required: true })}
          size="lg"
          radius="md"
        />
        <Button type="submit" loading={loading} size="lg">
          Sign In
        </Button>
        <Divider
          size="xs"
          label="Don't have an account?"
          labelPosition="center"
        />
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
