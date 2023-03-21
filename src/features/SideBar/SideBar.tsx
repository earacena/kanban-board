/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Divider, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router';
import { Boards } from '../Board';
import UserCard from '../User';

function SideBar() {
  const navigate = useNavigate();

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
    }}
    >
      <Title color="dark">Boards</Title>
      <Boards />
      <Stack align="center" css={{ marginTop: 'auto', marginBottom: '40px', width: '100%' }}>
        <Divider my="sm" css={{ width: '100%', marginBottom: '0' }} />
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
          onClick={() => navigate('/login')}
        >
          <UserCard />
        </button>
      </Stack>
    </div>
  );
}

export default SideBar;
