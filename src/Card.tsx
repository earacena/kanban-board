import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { setCardColumnId } from './cards.slice';
import { useAppDispatch } from './hooks';
import ItemTypes from './ItemTypes';

const style: CSSProperties = {
  border: '1px black solid',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

interface CardProps {
  id: number;
  // columnId: number;
  label: string;
}

interface DropResult {
  columnId: number;
}

function Card({ id, label }: CardProps) {
  const dispatch = useAppDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        dispatch(setCardColumnId({ id, newColumnId: dropResult.columnId }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.6 : 1;
  return (
    <div
      ref={drag}
      role="listitem"
      style={{ ...style, opacity }}
      data-testid={`card-${label}`}
    >
      {label}
    </div>
  );
}

export default Card;
