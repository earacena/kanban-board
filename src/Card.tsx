import { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import { SymbolDisplayPartKind } from "typescript";
import { ItemTypes } from "./ItemTypes";

const style: CSSProperties = {
  border: '1px black solid',
};

interface CardProps {
  label: string;
}

interface DropResult {
  label: string;
}

function Card({ label }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { label },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`Dropped card labelled ${item.label} in ${dropResult.label}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.6: 1;
  return (
    <div
      ref={drag}
      role="Card"
      style={{ ...style, opacity }}
      data-testid={`card-${label}`}
    >
      {label}
    </div>
  )
}

export default Card;