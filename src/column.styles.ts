import { css, keyframes } from '@emotion/react';

export const stretch = keyframes({
  '0%': {
    transform: 'scale(0.3)',
    opacity: '0%',
    borderRadius: '100%',
    height: '0',
  },
  '100%': {
    transform: 'scale(1)',
    opacity: '100%',
  },
});

export const columnStyle = css({
  display: 'flex',
  flexDirection: 'column',
  animation: `${stretch} 0.18s ease-in`,
  border: '2px lightgrey solid',
  borderRadius: '5px',
  backgroundColor: '#EEEEEE',
  minHeight: '50rem',
  minWidth: '20rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  paddingLeft: '0.1rem',
  paddingRight: '0.1rem',
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
});

export const columnLabelStyle = css({
  fontSize: '20px',
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
  padding: '1rem',
  margin: '0.25rem',
  borderRadius: '5px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
};

export const cardFormButtonStyle = css({
  borderRadius: '100%',
  border: 'none',
  padding: '0',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 'auto',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
});
