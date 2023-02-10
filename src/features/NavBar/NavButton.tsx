/** @jsxRuntime classic */
/** @jsx jsx */
import type { SerializedStyles } from '@emotion/react';
import { jsx, css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import { baseNavButtonStyle } from './styles/navBar.styles';

type NavButtonProps = {
  onClick: () => void,
  style?: SerializedStyles,
  children?: EmotionJSX.Element[] | JSX.Element[],
};

function NavButton({ children, onClick, style }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css({
        ...baseNavButtonStyle,
        ...style,
      })}
    >
      {children}
    </button>
  );
}

NavButton.defaultProps = {
  style: undefined,
  children: [],
};

export default NavButton;
