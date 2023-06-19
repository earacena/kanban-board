import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { SetStateAction } from 'react';
import { IoMdExit } from 'react-icons/io';
import { useAppDispatch } from '../../../hooks';
import loginService from '../../../services/login.service';
import logger from '../../../util/Logger';
import { resetUser } from '../../Auth';
import { ErrorType } from '../../Login/types/registerForm.types';

interface LogOutButtonProps {
  setModalOpened: (value: SetStateAction<boolean>) => void,
}

function LogOutButton({
  setModalOpened,
}: LogOutButtonProps) {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      await loginService.logout();
      dispatch(resetUser());
      setModalOpened(false);
    } catch (err: unknown) {
      const decoded = ErrorType.parse(err);
      logger.logError(decoded);

      notifications.show({
        title: 'Unable process that action',
        message: '',
      });
    }
  };

  return (
    <Button
      leftIcon={<IoMdExit />}
      onClick={handleLogOut}
      variant="filled"
      color="red"
    >
      Logout
    </Button>
  );
}

export default LogOutButton;
