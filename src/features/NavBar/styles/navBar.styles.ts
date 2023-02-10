import { css } from '@emotion/react';

export const navStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const addColumnButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px lightgray solid',
  borderRadius: '30px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
  },
});

export const addTagButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px lightgray solid',
  borderRadius: '30px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
  },
});

export const buttonLabelStyle = css({
  color: 'hsla(0, 0%, 14%, 1)',
  fontWeight: 700,
  marginLeft: '5px',
});
