import React, { CSSProperties } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import Column from './Column';
import { useAppDispatch, useAppSelector } from './hooks';
import { addColumn } from './columns.slice';

const ContainerStyle: CSSProperties = {
  display: 'flex',
  width: '100%',
  height: '100%',
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
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );
  const handleAddColumn = () => dispatch(addColumn({ label: 'Column' }));

  return (
    <div style={ContainerStyle}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} label={column.label} />
      ))}

      <DragOverlay
        style={{
          backgroundColor: 'lightgrey',
          borderRadius: '8px',
          boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.5)',
        }}
      >
        {activeCardId
          && activeCard
          && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {`${activeCard.id} - ${activeCard.label}`}
            </div>
          )}
      </DragOverlay>

      <button type="button" style={ButtonStyle} onClick={handleAddColumn}>
        Add Column
      </button>
    </div>
  );
}

export default React.memo(Container);
