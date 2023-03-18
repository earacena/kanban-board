/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import {
  Avatar,
  Group,
  Text,
} from '@mantine/core';
import { useAppSelector } from '../../hooks';

function UserCard() {
  const userSession = useAppSelector((state) => state.auth.user);

  return (
    <button
      type="button"
      css={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: 'lightgray',
          cursor: 'pointer',
        },
      }}
    >
      <Group css={{ padding: '10px' }}>
        <Avatar radius="xl" size="lg" color="dark" />
        <Text size="lg" fw={400}>
          {userSession ? userSession?.name : 'Please sign in.'}
        </Text>
        <Text size="sm" fw={300} color="dimmed">
          {userSession && userSession?.name}
        </Text>
      </Group>
    </button>
  );
}

export default UserCard;
