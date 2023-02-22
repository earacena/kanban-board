import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GrDrag } from 'react-icons/gr';

type SortableItemProps = {
  id: string;
  style: React.CSSProperties;
  children: React.ReactNode;
};

function SortableItem({
  id, style, children,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id });

  const sortableStyle = {
    ...style,
    listStyleType: 'none',
    opacity: isDragging ? '0.5' : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // The wrapping div must use the style tag over emotions css prop, otherwise dragging animations
  // do not work properly
  return (
    <div ref={setNodeRef} style={sortableStyle}>
      <button style={{ backgroundColor: 'white', border: 'none', cursor: 'grab' }} type="button" {...listeners} {...attributes}>
        <GrDrag />
      </button>
      {children}
    </div>
  );
}

export default SortableItem;
