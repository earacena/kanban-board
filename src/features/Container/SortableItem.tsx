/** @jsxRuntime classic */
import React from 'react';
import type { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GrDrag } from 'react-icons/gr';
/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/react';

interface SortableItemProps {
  id: string;
  style: CSSProperties;
  children: React.ReactNode;
}

function SortableItem({ id, style, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id });

  const sortableStyle: SerializedStyles = css({
    ...style,
    listStyleType: 'none',
    opacity: isDragging ? '0.5' : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  });

  return (
    <div ref={setNodeRef} css={sortableStyle}>
      <button css={{ backgroundColor: 'white', border: 'none' }} type="button" {...listeners} {...attributes}>
        <GrDrag />
      </button>
      {children}
    </div>
  );
}

export default SortableItem;
