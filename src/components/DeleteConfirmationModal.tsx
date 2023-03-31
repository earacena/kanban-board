/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button, Group, Modal, Stack, Text,
} from '@mantine/core';
import React, { SetStateAction } from 'react';

interface DeleteConfirmationModalProps {
  opened: boolean,
  setOpened: (value: SetStateAction<boolean>) => void,
  handleDelete: () => void,
  label: string,
}

function DeleteConfirmationModal({
  opened,
  setOpened,
  handleDelete,
  label,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      radius="md"
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      zIndex={201}
      withCloseButton={false}
    >
      <Stack align="center">
        <Text fw={500}>
          {label}
        </Text>
        <Group>
          <Button
            color="red"
            variant="light"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            type="button"
            variant="filled"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>
        </Group>

      </Stack>
    </Modal>
  );
}

export default DeleteConfirmationModal;
