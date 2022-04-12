import { css } from '@emotion/react';

export const appStyle = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
});

export const globalStyle = {
  body: {
    backgroundColor: 'darkslategray',
  },
};

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
