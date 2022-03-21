import type { CSSProperties, FC } from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style: CSSProperties = {
  border: '1px red solid',
};

function Column() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ label: 'Column1' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver;
  let backgroundColor = 'papayawhip';
  if (isActive) {
    backgroundColor = 'lightgreen';
  } else {
    backgroundColor = 'green';
  }

  return (
    <div
      ref={drop}
      role={'Column'}
      style={{ ...style, backgroundColor }}
    >
      {isActive ? 'release to drop' : 'drag a card here'}
    </div>
  )
}

export default Column;
