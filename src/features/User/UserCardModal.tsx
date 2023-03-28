import {
  Avatar, Group, Modal, Stack, Text,
} from '@mantine/core';
import React, { SetStateAction } from 'react';
import { useAppSelector } from '../../hooks';

interface UserCardModalProps {
  userCardModalOpened: boolean,
  setUserCardModalOpened: (value: SetStateAction<boolean>) => void,
}

function UserCardModal({ userCardModalOpened, setUserCardModalOpened }: UserCardModalProps) {
  const userSession = useAppSelector((state) => state.auth.user);

  return (
    <Modal opened={userCardModalOpened} onClose={() => setUserCardModalOpened(false)}>
      <Group>
        <Avatar radius="xl" size="xl" />
        <Stack spacing={1}>
          <Text fz="xl" fw={500}>{userSession?.name}</Text>
          <Text fz="sm" color="dimmed" fw={300}>{userSession?.username}</Text>
        </Stack>
      </Group>
    </Modal>
  );
}

export default UserCardModal;
