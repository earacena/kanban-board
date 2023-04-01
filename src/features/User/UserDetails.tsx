/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import {
  Avatar, Group, Loader, Stack, Text,
} from '@mantine/core';
import { useAppSelector } from '../../hooks';

function UserDetails() {
  const userSession = useAppSelector((state) => state.auth.user);
  const isFetching = useAppSelector((state) => state.auth.isFetching);

  return (
    <Group align="center" css={{ padding: '10px' }}>
      <Avatar radius="xl" size="lg" color="dark" />
      <Stack spacing="xs">
        <Text size="xl" fw={400}>
          {
            userSession
              ? (
                userSession?.name
              ) : (
                <Group>
                  Please sign in.
                  {isFetching && <Loader size="sm" variant="dots" /> }
                </Group>
              )
          }
        </Text>
      </Stack>
    </Group>
  );
}

export default UserDetails;
