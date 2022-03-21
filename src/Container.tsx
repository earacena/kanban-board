import React from 'react';
import Card from './Card';
import Column from './Column';

function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Column />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Card label="Card 1" />
        <Card label="Card 2" />
        <Card label="Card 3" />
      </div>
    </div>
  );
}

export default React.memo(Container);
