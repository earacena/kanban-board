/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button, Divider, Text, TextInput, Stack,
} from '@mantine/core';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Auth';
import { useAppDispatch } from '../../hooks';
import userService from '../../services/user.service';

interface NewUserCredentialInputs {
  name: string;
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
      const userSession = await userService.create({
        name,
        username,
        password,
      });

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
          id="name-input"
          type="text"
          label="Name"
          aria-label="name"
          {...register('name', { required: true })}
          error={
            errors.name?.type === 'required' && (
              <Text color="red" size="sm">
                Please enter a name
              </Text>
            )
          }
          radius="md"
          size="lg"
        />
        <TextInput
          id="username-input"
          type="text"
          label="Username"
          aria-label="username"
          {...register('username', { required: true })}
          error={
            errors.username?.type === 'required' && (
              <Text color="red" size="sm">
                Please enter a username
              </Text>
            )
          }
          radius="md"
          size="lg"
        />
        <TextInput
          id="password-input"
          aria-label="password"
          label="Password"
          type="password"
          error={
            errors.username?.type === 'required' && (
              <Text color="red" size="sm">
                Please enter a password
              </Text>
            )
          }
          {...register('password', { required: true })}
          radius="md"
          size="lg"
        />
        <Button size="lg" type="submit" loading={loading}>
          Create New Account
        </Button>
        <Divider size="xs" label="Have an account?" labelPosition="center" />
        <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
}

export default RegisterForm;
