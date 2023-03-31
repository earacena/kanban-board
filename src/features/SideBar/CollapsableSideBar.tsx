/** @jsxRuntime classic */
/** @jsx jsx */
import React, { SetStateAction, useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Burger, Divider, Stack, Title,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { Boards } from '../Board';
import { UserCardModal, UserDetails } from '../User';
import { useAppSelector } from '../../hooks';

interface CollapsableSideBarProps {
  sideBarOpened: boolean;
  setSideBarOpened: (value: SetStateAction<boolean>) => void;
}

function CollapsableSideBar({
  sideBarOpened,
  setSideBarOpened,
}: CollapsableSideBarProps) {
  const navigate = useNavigate();
  const userSession = useAppSelector((state) => state.auth.user);
  const [userCardModelOpened, setUserCardModalOpened] = useState<boolean>(false);

  return sideBarOpened ? (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '10px',
        flexGrow: 1,
        paddingBottom: '0',
        '@media(min-width: 800px)': {
          display: 'none',
        },
      }}
    >
      <Burger
        opened={sideBarOpened}
        onClick={() => setSideBarOpened(false)}
        css={{ alignSelf: 'flex-start' }}
      />
      <Title color="dark">Boards</Title>
      <Boards />
      <Stack
        align="center"
        css={{ marginTop: 'auto', marginBottom: '40px', width: '100%' }}
      >
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
          onClick={
            !userSession
              ? () => navigate('/login')
              : () => setUserCardModalOpened(!userCardModelOpened)
          }
        >
          {userCardModelOpened && (
            <UserCardModal
              userCardModalOpened={userCardModelOpened}
              setUserCardModalOpened={setUserCardModalOpened}
            />
          )}
          <UserDetails />
        </button>
      </Stack>
    </div>
  ) : (
    <div
      css={{
        height: '40px',
        width: '100%',
        backgroundColor: 'white',
        '@media(min-width: 800px)': {
          display: 'none',
        },
        padding: '15px',
      }}
    >
      <Burger opened={sideBarOpened} onClick={() => setSideBarOpened(!sideBarOpened)} />
    </div>
  );
}

export default CollapsableSideBar;
