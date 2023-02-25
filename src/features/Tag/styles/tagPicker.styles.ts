import { css } from '@emotion/react';

export const tagPickerStyle = css({
  display: 'flex',
  padding: '0.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const tagStyle = css({
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});
