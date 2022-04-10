/** @jsxRuntime classic */
import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GrDrag } from 'react-icons/gr';
import { createPortal } from 'react-dom';
import Column from './Column';
import { useAppSelector } from './hooks';
import Droppable from './Droppable';
import {
  containerStyle,
  dragHandleIconStyle,
  dragOverlayCardStyle,
  dragOverlayStyle,
  trashDroppableStyle,
} from './container.styles';

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );

  return (
    <div css={containerStyle}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} label={column.label} />
      ))}

      {createPortal(
        <DragOverlay
          style={{
            ...dragOverlayStyle,
            borderLeft: `3px ${activeCard?.color} solid`,
          }}
        >
          {activeCardId
            && activeCard
            && (
              <div css={dragOverlayCardStyle}>
                <GrDrag css={dragHandleIconStyle} />
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
          <Droppable id="trash" style={trashDroppableStyle}>
            Drag here to delete
          </Droppable>
        )}
    </div>
  );
}

export default React.memo(Container);
