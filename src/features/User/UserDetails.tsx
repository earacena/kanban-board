/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import {
  Avatar,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useAppSelector } from '../../hooks';

function UserDetails() {
  const userSession = useAppSelector((state) => state.auth.user);

  return (
    <Group align="center" css={{ padding: '10px' }}>
      <Avatar radius="xl" size="lg" color="dark" />
      <Stack spacing="xs" align="flex-start">
        <Text size="xl" fw={400}>
          {userSession ? userSession?.name : 'Please sign in.'}
        </Text>
      </Stack>
    </Group>
  );
}

export default UserDetails;
