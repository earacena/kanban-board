import { css } from '@emotion/react';

export const navStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const addColumnButtonStyle = css({
  border: '1px lightgray solid',
  borderRadius: '15%',
  padding: '0',
  height: '48px',
  width: '48px',
  margin: '0.5rem',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
  },
});

export const addTagButtonStyle = css({
  border: '1px lightgray solid',
  borderRadius: '15%',
  padding: '0',
  height: '48px',
  width: '48px',
  margin: '0.5rem',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
  },
});
