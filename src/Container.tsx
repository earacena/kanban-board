import React, { CSSProperties } from 'react';
import Column from './Column';
import { useAppDispatch, useAppSelector } from './hooks';
import { addColumn } from './columns.slice';

const ContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  overflow: 'auto',
  clear: 'both',
};

const ButtonStyle: CSSProperties = {
  width: '4rem',
};

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const dispatch = useAppDispatch();

  const handleAddColumn = () => dispatch(addColumn({ label: 'Column' }));

  return (
    <div>
      <div style={ContainerStyle}>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} label={column.label} />
        ))}
        <button type="button" style={ButtonStyle} onClick={handleAddColumn}>Add Column</button>
      </div>
    </div>
  );
}

export default React.memo(Container);
