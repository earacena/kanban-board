/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import { Card } from '../Card';
import { Columns } from '../Column';
import { useAppSelector } from '../../hooks';
import {
  containerStyle,
} from './styles/container.styles';
import SortableItem from './SortableItem';
import { sortableItemStyle } from '../Column/styles/column.styles';

function Container() {
  const columns = useAppSelector((state) => state.columns.allColumns);
  const selectedBoardId = useAppSelector((state) => state.boards.selectedBoardId);
  const columnsInBoard = columns.filter((c) => c.boardId === selectedBoardId);
  const activeCardId = useAppSelector((state) => state.cards.activeCardId);
  const activeCard = useAppSelector(
    (state) => state.cards.allCards.find((c) => c.id === activeCardId),
  );
  const activeCardColumn = columns.find((col) => col.id === activeCard?.columnId);

  return (
    <div css={containerStyle}>
      <Columns columns={columnsInBoard} />
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
                  columnLabel={activeCardColumn?.label ?? ''}
                />
              </SortableItem>
            )}
        </DragOverlay>,
        document.body,
      )}
    </div>
  );
}

export default React.memo(Container);
