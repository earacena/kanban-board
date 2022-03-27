import React, { CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: number,
  style?: CSSProperties,
  children?: React.ReactNode,
}

const defaultProps = {
  children: undefined,
  style: undefined,
};

function Droppable({ id, style, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id: id.toString() });

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

Droppable.defaultProps = defaultProps;

export default Droppable;
