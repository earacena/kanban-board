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

function UserDetails() {
  const userSession = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <Group css={{ padding: '10px' }}>
        <Avatar radius="xl" size="lg" color="dark" />
        <Text size="lg" fw={400}>
          {userSession ? userSession?.name : 'Please sign in.'}
        </Text>
        <Text size="sm" fw={300} color="dimmed">
          {userSession && userSession?.name}
        </Text>
      </Group>
    </div>
  );
}

export default UserDetails;
