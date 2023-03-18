/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Divider, Stack, Title } from '@mantine/core';
import { Boards } from '../Board';
import UserCard from '../User';

function SideBar() {
  return (
    <div css={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'white',
      minWidth: '350px',
      maxWidth: '350px',
      minHeight: '100%',
      overflow: 'auto',
      padding: '10px',
    }}
    >
      <Title color="dark">Boards</Title>
      <Boards />
      <Stack align="center" css={{ marginTop: 'auto', marginBottom: '40px', width: '100%' }}>
        <Divider my="sm" css={{ width: '100%', marginBottom: '0' }} />
        <UserCard />
      </Stack>
    </div>
  );
}

export default SideBar;
