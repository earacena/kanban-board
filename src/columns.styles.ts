import { css } from '@emotion/react';

export default css({
  display: 'flex',
  overflow: 'auto',
  margin: '0',
  listStyleType: 'none',
  '&:first-child': {
    marginLeft: 'auto',
  },
  '&:last-child': {
    marginRight: 'auto',
  },
});
