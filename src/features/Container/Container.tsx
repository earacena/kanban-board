/** @jsxRuntime classic */
import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { createPortal } from 'react-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { Text } from '@mantine/core';
import { Columns } from '../Column';
import { useAppSelector } from '../../hooks';
import Droppable from './Droppable';
import {
  containerStyle,
  dragOverlayStyle,
  trashDroppableStyle,
} from './styles/container.styles';

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );

  return (
    <div css={containerStyle}>
      <Columns columns={columns} />
      {createPortal(
        <DragOverlay
          style={{
            ...dragOverlayStyle,
            borderLeft: `3px ${activeCard?.color} solid`,
          } as React.CSSProperties}
        >
          {activeCardId
            && activeCard
            && (
              <Text truncate>{activeCard.brief}</Text>
            )}
        </DragOverlay>,
        document.body,
      )}
      {activeCardId
        && activeCard
        && (
          <Droppable id="trash" style={trashDroppableStyle}>
            Drop here to delete
            <BsFillTrashFill />
          </Droppable>
        )}
    </div>
  );
}

export default React.memo(Container);
