import React, { CSSProperties, useState } from 'react';
import Card from './Card';
import Column, { Columns } from './Column';
import { Static as RtStatic } from 'runtypes';
import { maxHeaderSize } from 'http';

const ContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  clear: 'both',
};

const ButtonStyle: CSSProperties = {
  width: '4rem',
};

const findLargestIdValue = (columns: RtStatic<typeof Columns>) => {
  return columns.reduce((prev, curr) => Math.max(prev, curr.id), 0);
};

function Container() {
  const [columns, setColumns] = useState<RtStatic<typeof Columns>>([]);

  const handleAddColumn = () => {
    const newId = findLargestIdValue(columns) + 1;
    setColumns(columns.concat({
      id: newId,
      label: `Column ${newId}`,
      cards: [],
    }))
  };

  return (
    <div>
      <div style={ContainerStyle}>
        {columns.map((column) => (
          <Column key={column.id} label={column.label} />
        ))}
        <button style={ButtonStyle} onClick={handleAddColumn}>Add Column</button>
      </div>
    </div>
  );
}

export default React.memo(Container);
