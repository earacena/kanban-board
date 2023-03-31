import { css } from '@emotion/react';

export const appStyle = css({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
  maxWidth: '100vw',
  '@media(max-width: 800px)': {
    flexDirection: 'column',
  },
});

export const globalStyle = {
  body: {
    backgroundColor: 'darkslategray',
  },
};
