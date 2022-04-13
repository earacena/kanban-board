import { css } from '@emotion/react';

export const cardEditButtonStyle = css({
  border: '1px lightgrey solid',
  margin: 'auto',
  marginBottom: '0.5rem',
  borderRadius: '15%',
  height: '2rem',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  },
});

export const cardEditFormStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
