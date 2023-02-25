import { css } from '@emotion/react';

export const tagPickerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginLeft: '10px',
});

export const tagStyle = css({
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});
