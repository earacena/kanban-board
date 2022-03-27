import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: number,
  children?: React.ReactNode,
}

const defaultProps = {
  children: undefined,
};

function Draggable({ id, children }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id: id.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button type="button" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

Draggable.defaultProps = defaultProps;

export default Draggable;
