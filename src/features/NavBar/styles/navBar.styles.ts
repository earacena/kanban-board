import { css } from '@emotion/react';

export const navStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  margin: '16px',
  marginLeft: '22px',
});

export const baseNavButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px lightgray solid',
  borderRadius: '30px',
  padding: '10px',
  marginLeft: '20px',
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
