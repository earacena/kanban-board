import React, { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GrDrag } from 'react-icons/gr';

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
    transform,
    transition,
  } = useSortable({ id });

  const sortableStyle = {
    ...style,
    listStyleType: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={sortableStyle}>
      <button style={{ border: 'none' }} type="button" {...listeners} {...attributes}>
        <GrDrag />
      </button>
      {children}
    </div>
  );
}

export default SortableItem;
