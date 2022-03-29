import React, { CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string,
  style?: CSSProperties,
  children?: React.ReactNode,
}

const defaultProps = {
  children: undefined,
  style: undefined,
};

function Droppable({ id, style, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = style;
  // if (isOver) {
  //   droppableStyle = {
  //     ...style,
  //     border: '3px green solid',
  //     borderRadius: '5px',
  //   };
  // }

  return (
    <div ref={setNodeRef} style={droppableStyle}>
      {children}
    </div>
  );
}

Droppable.defaultProps = defaultProps;

export default Droppable;
