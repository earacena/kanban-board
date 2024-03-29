import { css } from '@emotion/react';

export const cardStyle = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexGrow: 1,
  alignItems: 'center',
  cursor: 'pointer',
});

export const expandCardButtonStyle = css({
  backgroundColor: 'white',
  border: 'none',
});

export const cardHeaderStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  borderBottom: '1px grey solid',
  marginBottom: '1rem',
});

export const briefStyle = css({
  marginTop: '0',
  alignSelf: 'center',
  color: 'gray',
  fontSize: '20px',
});
