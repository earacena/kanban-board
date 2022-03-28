import React, { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: number;
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
  } = useSortable({ id: id.toString() });

  const sortableStyle = {
    ...style,
    listStyleType: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners}>
      {children}
    </li>
  );
}

export default SortableItem;
