import React, { CSSProperties, useState } from 'react';
import Card from './Card';
import Column, { Columns } from './Column';
import { Static as RtStatic } from 'runtypes';

const ContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  clear: 'both',
};

const ButtonStyle: CSSProperties = {
  width: '4rem',
};

function Container() {
  const [columns, setColumns] = useState<RtStatic<typeof Columns>>([]);

  return (
    <div>
      <div style={ContainerStyle}>
        {columns.map((column) => (
          <Column key={column.id} label={column.label} />
        ))}
        <button style={ButtonStyle}>Add Column</button>
      </div>
    </div>
  );
}

export default React.memo(Container);
