/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button, Divider, Text, TextInput, Stack, Group,
} from '@mantine/core';
import { BsCheckLg, BsExclamationLg, BsX } from 'react-icons/bs';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { setUser } from '../Auth';
import { useAppDispatch } from '../../hooks';
import userService from '../../services/user.service';
import decodeWith from '../../util/decode';
import { ErrorType } from './types/registerForm.types';

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
      name: '',
      username: '',
      password: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
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

      notifications.show({
        title: 'Account successfully created',
        icon: <BsCheckLg />,
        color: 'green',
        message: '',
      });

      navigate('/');
    } catch (error: unknown) {
      const decoded = decodeWith(ErrorType)(error);
      let message: string = '';
      if (decoded.message.includes('NetworkError')) {
        message = 'Unable to connect to server';
      } else if (decoded.message.includes('invalid credentials')) {
        message = 'Invalid credentials used, please try again.';
      }

      notifications.show({
        title: 'Error trying to create a new account.',
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
          {...register('username', { required: true, minLength: 8, maxLength: 64 })}
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
        <Group
          spacing="sm"
          style={{
            display: (errors.username?.types?.minLength || errors.username?.types?.maxLength) ? '' : 'none',
            color: 'red',
          }}
        >
          <BsExclamationLg />
          <Text size="xs">
            Username should be at least 8 characters, but less than 64 characters
          </Text>
        </Group>
        <TextInput
          id="password-input"
          aria-label="password"
          label="Password"
          type="password"
          error={
            errors.password && (
              <Text color="red" size="sm">
                Invalid password
              </Text>
            )
          }
          {...register(
            'password',
            {
              required: true,
              validate: {
                validLength: (v: string) => (v.length >= 8 && v.length <= 64),
                containsOneNumber: (v: string) => (/[0-9]/).test(v),
                containsOneUppercaseLetter: (v: string) => (/[A-Z]/).test(v),
                containsOneLowercaseLetter: (v: string) => (/[a-z]/).test(v),
                containsOneSpecialSymbol: (v: string) => (/[!@#$%^&*=+-]/).test(v),
              },
            },
          )}
          radius="md"
          size="lg"
        />
        <Group
          spacing="sm"
          style={{
            display: errors.password?.types?.validLength ? '' : 'none',
            color: (errors.password?.types?.validLength) ? 'red' : 'green',
          }}
        >
          <BsExclamationLg />
          <Text size="xs">
            Password must be between 8 and 64 characters
          </Text>
        </Group>
        <Group
          spacing="sm"
          style={{
            display: errors.password?.types?.containsOneUppercaseLetter ? '' : 'none',
            color: (errors.password?.types?.containsOneUppercaseLetter) ? 'red' : 'green',
          }}
        >
          <BsExclamationLg />
          <Text size="xs">
            Password must have at least 1 uppercase letter
          </Text>
        </Group>
        <Group
          spacing="sm"
          style={{
            display: errors.password?.types?.containsOneLowercaseLetter ? '' : 'none',
            color: (errors.password?.types?.containsOneLowercaseLetter) ? 'red' : 'green',
          }}
        >
          <BsExclamationLg />
          <Text
            size="xs"
          >
            Password must have at least 1 lowercase letter
          </Text>
        </Group>
        <Group
          spacing="sm"
          style={{
            display: errors.password?.types?.containsOneNumber ? '' : 'none',
            color: (errors.password?.types?.containsOneNumber) ? 'red' : 'green',
          }}
        >
          <BsExclamationLg />
          <Text size="xs">
            Password must have at least 1 number
          </Text>
        </Group>
        <Group
          spacing="sm"
          style={{
            display: errors.password?.types?.containsOneSpecialSymbol ? '' : 'none',
            color: (errors.password?.types?.containsOneSpecialSymbol) ? 'red' : 'green',
          }}
        >
          <BsExclamationLg />
          <Text size="xs">
            Password must have at least 1 special symbol (!@#$%^&*+-=)
          </Text>
        </Group>
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
