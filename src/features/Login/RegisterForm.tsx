/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button, Divider, Text, TextInput, Stack, Group,
} from '@mantine/core';
import { BsExclamationLg } from 'react-icons/bs';
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
      name: '',
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

  console.log(errors);

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
          spacing="xs"
          style={{
            display: (errors.password && errors.password?.type === 'validLength') ? '' : 'none',
          }}
        >
          <BsExclamationLg />
          <Text size="sm">
            Password must be between 8 and 64 characters
          </Text>
        </Group>
        <Group
          spacing="xs"
          style={{
            display: (errors.password && errors.password?.type === 'containsOneUppercaseLetter') ? '' : 'none',
          }}
        >
          <BsExclamationLg />
          <Text size="sm">
            Password must have at least 1 uppercase letter
          </Text>
        </Group>
        <Group
          spacing="xs"
          style={{
            display: (errors.password && errors.password?.type === 'containsOneLowercaseLetter') ? '' : 'none',
          }}
        >
          <BsExclamationLg />
          <Text
            size="sm"
          >
            Password must have at least 1 lowercase letter
          </Text>
        </Group>
        <Group
          spacing="xs"
          style={{
            display: (errors.password && errors.password?.type === 'containsOneNumber') ? '' : 'none',
          }}
        >
          <BsExclamationLg />
          <Text size="sm">
            Password must have at least 1 number
          </Text>
        </Group>
        <Group
          spacing="xs"
          style={{
            display: (errors.password && errors.password?.type === 'containsOneSpecialSymbol') ? '' : 'none',
          }}
        >
          <BsExclamationLg />
          <Text size="sm">
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
