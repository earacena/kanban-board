/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { BsGearFill, BsPlus, BsFile } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
import { addColumnButtonStyle, addTagButtonStyle, navStyle } from './styles/navBar.styles';
import { openSettingsButtonStyle } from '../Settings';

type NavBarProps = {
  handleAddColumn: () => void,
  setTagFormOpened: (value: React.SetStateAction<boolean>) => void,
  setSettingsOpened: (value: React.SetStateAction<boolean>) => void,
};

function NavBar({
  handleAddColumn,
  setTagFormOpened,
  setSettingsOpened,
}: NavBarProps) {
  return (
    <nav css={navStyle}>
      <button
        type="button"
        onClick={handleAddColumn}
        css={addColumnButtonStyle}
      >
        <BsPlus size={20} />
        <BsFile size={20} />
      </button>
      <button
        css={addTagButtonStyle}
        type="button"
        onClick={() => setTagFormOpened(true)}
      >
        <BsPlus size={20} />
        <FaTags size={20} />
      </button>
      <button
        css={openSettingsButtonStyle}
        type="button"
        onClick={() => setSettingsOpened(true)}
      >
        <BsGearFill size={20} />
      </button>
    </nav>
  );
}

export default NavBar;
