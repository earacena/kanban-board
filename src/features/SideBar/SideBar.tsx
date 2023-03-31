/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import { Divider, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router';
import { Boards } from '../Board';
import { UserCardModal, UserDetails } from '../User';
import { useAppSelector } from '../../hooks';

function SideBar() {
  const navigate = useNavigate();
  const userSession = useAppSelector((state) => state.auth.user);
  const [userCardModelOpened, setUserCardModalOpened] = useState<boolean>(false);

  return (
    <div css={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'white',
      minWidth: '350px',
      maxWidth: '350px',
      minHeight: '100%',
      overflow: 'hidden',
      padding: '10px',
      paddingBottom: '0',
      '@media(max-width: 800px)': {
        display: 'none',
      },
    }}
    >
      <Title color="dark">Boards</Title>
      <Boards />
      <Stack align="center" css={{ marginTop: 'auto', marginBottom: '40px', width: '100%' }}>
        <Divider my="sm" css={{ width: '100%', marginBottom: '0' }} />
        <button
          type="button"
          css={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            border: 'none',
            width: '100%',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'lightgray',
              cursor: 'pointer',
            },
          }}
          onClick={!userSession ? () => navigate('/login') : () => setUserCardModalOpened(!userCardModelOpened)}
        >
          { userCardModelOpened
          && (
          <UserCardModal
            userCardModalOpened={userCardModelOpened}
            setUserCardModalOpened={setUserCardModalOpened}
          />
          )}
          <UserDetails />
        </button>
      </Stack>
    </div>
  );
}

export default SideBar;
