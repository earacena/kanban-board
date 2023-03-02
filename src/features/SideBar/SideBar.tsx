/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Title } from '@mantine/core';
import { Boards } from '../Board';

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
    </div>
  );
}

export default SideBar;
