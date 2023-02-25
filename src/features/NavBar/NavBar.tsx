/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { BsGearFill, BsPlus, BsFileFill } from 'react-icons/bs';
import {
  navStyle,
  buttonLabelStyle,
} from './styles/navBar.styles';
import NavButton from './NavButton';

type NavBarProps = {
  handleAddColumn: () => void,
  setSettingsOpened: (value: React.SetStateAction<boolean>) => void,
};

function NavBar({
  handleAddColumn,
  setSettingsOpened,
}: NavBarProps) {
  return (
    <nav css={navStyle}>
      <NavButton
        onClick={handleAddColumn}
      >
        <BsPlus size={17} />
        <BsFileFill size={17} />
        <span
          css={buttonLabelStyle}
        >
          ADD COLUMN
        </span>
      </NavButton>
      <NavButton
        onClick={() => setSettingsOpened(true)}
      >
        <BsGearFill size={17} />
        <span css={buttonLabelStyle}>
          OPEN SETTINGS
        </span>
      </NavButton>
    </nav>
  );
}

export default NavBar;
