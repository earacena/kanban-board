import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from 'react';
import { IoMdExit } from 'react-icons/io';
import { useAppDispatch } from '../../../hooks';
import loginService from '../../../services/login.service';
import decodeWith from '../../../util/decode';
import logger from '../../../util/Logger';
import { resetUser } from '../../Auth';
import { ErrorType } from '../../Login/types/registerForm.types';

function LogOutButton() {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      await loginService.logout();
      dispatch(resetUser());
    } catch (error: unknown) {
      const decoded = decodeWith(ErrorType)(error);
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
