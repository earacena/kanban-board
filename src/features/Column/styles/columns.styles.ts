import { css } from '@emotion/react';

export default css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  overflowY: 'auto',
  minWidth: '100%',
  margin: '0',
  listStyleType: 'none',
  '&:first-of-type': {
    marginLeft: 'auto',
  },
  '&:last-of-type': {
    marginRight: 'auto',
  },
});
