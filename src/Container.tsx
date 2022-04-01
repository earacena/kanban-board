/** @jsxRuntime classic */
import React, { CSSProperties } from 'react';
import { DragOverlay } from '@dnd-kit/core';
/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import { GrDrag } from 'react-icons/gr';
import { createPortal } from 'react-dom';
import Column from './Column';
import { useAppDispatch, useAppSelector } from './hooks';
import { addColumn } from './columns.slice';

const ContainerStyle: SerializedStyles = css({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  overflow: 'auto',
  clear: 'both',
});

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
    <div css={ContainerStyle}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} label={column.label} />
      ))}

      {createPortal(
        <DragOverlay
          style={{
            borderRadius: '8px',
            backgroundColor: 'white',
            borderLeft: `3px ${activeCard?.color} solid`,
            boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.5)',
          }}
        >
          {activeCardId
            && activeCard
            && (
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',

                }}
              >
                <GrDrag css={{ padding: '1.2rem' }} />
                <p>{activeCard.brief}</p>
                <div />
              </div>
            )}
        </DragOverlay>,
        document.body,
      )}

      <button type="button" style={ButtonStyle} onClick={handleAddColumn}>
        Add Column
      </button>
    </div>
  );
}

export default React.memo(Container);
