/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { BsGearFill, BsPlus, BsFileFill } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
import {
  navStyle,
  buttonLabelStyle,
} from './styles/navBar.styles';
import NavButton from './NavButton';

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
        onClick={() => setTagFormOpened(true)}
      >
        <BsPlus size={17} css={css({ marginRight: '0' })} />
        <FaTags size={17} />
        <span
          css={buttonLabelStyle}
        >
          ADD TAG
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
