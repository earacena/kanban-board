import { css, keyframes } from '@emotion/react';

export const stretch = keyframes({
  '0%': {
    filter: 'blur(20px)',
    opacity: '0%',
  },
  '100%': {
    filter: 'blur(0)',
    opacity: '100%',
  },
});

export const columnStyle = css({
  display: 'flex',
  flexDirection: 'column',
  animation: `${stretch} 0.18s ease-in`,
  border: '2px lightgrey solid',
  borderRadius: '20px',
  backgroundColor: '#EEEEEE',
  minWidth: '350px',
  maxWidth: '450px',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '20px',
  paddingLeft: '10px',
  paddingRight: '10px',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
});

export const columnHeaderStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

export const columnLabelStyle = css({
  fontSize: '20px',
  fontWeight: '700',
});

export const columnEditButtonStyle = css({
  border: '1px lightgrey solid',
  margin: '0.5rem',
  borderRadius: '15%',
  height: '2rem',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  },
});

export const sortableItemStyle = {
  display: 'flex',
  flexDirection: 'row',
  border: '1px lightgrey solid',
  backgroundColor: 'white',
  padding: '15px',
  margin: '4px',
  borderRadius: '10px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
};

export const cardFormButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '40px',
  padding: '10px',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
});

export const cardFormButtonLabelStyle = {
  color: 'hsla(0, 0%, 14%, 1)',
  fontWeight: 700,
};

export const columnDeleteButtonStyle = css({
  border: '1px lightgrey solid',
  color: 'red',
  margin: '0.5rem',
  borderRadius: '15%',
  height: '2rem',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'lightgray',
    transform: 'translateY(-2px)',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  },
});
