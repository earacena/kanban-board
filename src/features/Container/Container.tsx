/** @jsxRuntime classic */
import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { createPortal } from 'react-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { Card } from '../Card';
import { Columns } from '../Column';
import { useAppSelector } from '../../hooks';
import Droppable from './Droppable';
import {
  containerStyle,
  trashDroppableStyle,
} from './styles/container.styles';
import SortableItem from './SortableItem';
import { sortableItemStyle } from '../Column/styles/column.styles';

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );
  const activeCardColumn = columns.find((col) => col.id === activeCard?.columnId);

  return (
    <div css={containerStyle}>
      <Columns columns={columns} />
      {createPortal(
        <DragOverlay>
          {activeCardId
            && activeCard
            && (
              <SortableItem
                id={activeCardId}
                style={sortableItemStyle as React.CSSProperties}
              >
                <Card
                  id={activeCard.id}
                  brief={activeCard.brief}
                  body={activeCard.body}
                  tags={activeCard.tags}
                  columnLabel={activeCardColumn?.label ?? ''}
                />
              </SortableItem>
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
