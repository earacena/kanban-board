import { css } from '@emotion/react';

export default css({
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
