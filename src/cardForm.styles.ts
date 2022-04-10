import { css } from '@emotion/react';

export const cardFormStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const briefTextAreaStyle = css({
  width: '100%',
});

export const bodyTextAreaStyle = css({
  width: '100%',
  marginTop: '0.2rem',
});

export const tagPickerStyle = css({
  display: 'flex',
  padding: '0.5rem',
});

export const tagStyle = css({
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

export const colorInputStyle = css({
  marginBottom: '0.5rem',
});
