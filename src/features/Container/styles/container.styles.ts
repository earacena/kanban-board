import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes({
  '0%': {
    opacity: '0%',
  },
  '100%': {
    opacity: '100%',
  },
});

export const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  clear: 'both',
});

export const dragOverlayStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: 'white',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.5)',
};

export const dragOverlayCardStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '10px',
  fontFamily: 'Open Sans',
});

export const dragHandleIconStyle = css({
  marginLeft: '15px',
});

export const trashDroppableStyle = css({
  position: 'absolute',
  animation: `${fadeIn} 0.2s ease-in`,
  bottom: '5%',
  left: '50%',
  backgroundColor: 'pink',
  transform: 'translate(-50%, -50%)',
  border: '2px red solid',
  borderRadius: '1rem',
  padding: '60px',
  paddingLeft: '100px',
  paddingRight: '100px',
  color: 'red',
  boxShadow: '0px 3px 10px rgb(255, 0, 0, 0.3)',
  listStyle: 'none',
});
