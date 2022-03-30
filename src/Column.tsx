import React, { useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { CSSProperties } from 'react';
import { useAppSelector } from './hooks';
import Card from './Card';
import SortableItem from './SortableItem';
import Droppable from './Droppable';
import CardForm from './CardForm';

const style: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px red solid',
  height: '100%',
  minHeight: '15rem',
  minWidth: '20rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const cardStyle: CSSProperties = {
  border: '1px lightgrey solid',
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '5px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
  borderLeft: '3px red solid',
};

interface ColumnProps {
  id: string;
  label: string;
}

function Column({ id, label }: ColumnProps) {
  // const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const cards = useAppSelector((state) => state.cards.allCards);
  const cardsInThisColumn = cards.filter((card) => card.columnId === id);
  const cardIds = cardsInThisColumn.map((card) => card.id.toString());

  return (
    <Droppable id={id} key={id} style={style}>
      {`${label} ${id}`}
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cardsInThisColumn.map((card) => (
          <SortableItem key={card.id} id={card.id} style={{ ...cardStyle, borderLeft: ` 3px${card.color} solid` }}>
            <Card
              key={card.id}
              id={card.id}
              label={card.label}
              columnId={card.columnId}
              body={card.body}
            />
          </SortableItem>
        ))}
      </SortableContext>
      {!formVisible && (
        <button type="button" onClick={() => setFormVisible(!formVisible)}>
          Add Card
        </button>
      )}
      {formVisible && (
        <CardForm formVisible={formVisible} setFormVisible={setFormVisible} columnId={id} />
      )}
    </Droppable>
  );
}

export default Column;
