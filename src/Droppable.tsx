/** @jsxRuntime classic */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/react';

interface DroppableProps {
  id: string,
  style?: SerializedStyles,
  children?: React.ReactNode,
}

const defaultProps = {
  children: undefined,
  style: undefined,
};

function Droppable({ id, style, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = style;

  return (
    <div ref={setNodeRef} css={droppableStyle}>
      {children}
    </div>
  );
}

Droppable.defaultProps = defaultProps;

export default Droppable;
