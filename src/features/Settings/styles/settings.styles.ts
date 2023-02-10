import { css } from '@emotion/react';

export default css({
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
