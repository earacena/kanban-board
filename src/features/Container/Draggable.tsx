import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: string,
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
  } = useDraggable({ id });

  const style = {
    border: '1px lightgrey solid',
    backgroundColor: 'white',
    padding: '1rem',
    margin: '0.2em',
    borderRadius: '8px',
    boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
    listStyleType: 'none',
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </li>
  );
}

Draggable.defaultProps = defaultProps;

export default Draggable;
