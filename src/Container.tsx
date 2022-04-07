/** @jsxRuntime classic */
import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import { GrDrag } from 'react-icons/gr';
import { createPortal } from 'react-dom';
import Column from './Column';
import { useAppSelector } from './hooks';
import Droppable from './Droppable';

const ContainerStyle: SerializedStyles = css({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  overflow: 'auto',
  clear: 'both',
});

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );

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
      {activeCardId
        && activeCard
        && (
          <Droppable
            id="trash"
            style={css({
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px red solid',
              borderRadius: '1rem',
              padding: '1rem',
              paddingLeft: '5rem',
              paddingRight: '5rem',
            })}
          >
            Drag card here to discard
          </Droppable>
        )}
    </div>
  );
}

export default React.memo(Container);
