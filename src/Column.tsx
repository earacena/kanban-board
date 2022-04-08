/** @jsxRuntime classic */
import React, { useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
/** @jsx jsx */
import {
  css,
  keyframes,
  jsx,
  SerializedStyles,
  Keyframes,
} from '@emotion/react';
import { IoMdAddCircle } from 'react-icons/io';
import { BsPenFill } from 'react-icons/bs';
import { useAppSelector } from './hooks';
import Card from './Card';
import SortableItem from './SortableItem';
import Droppable from './Droppable';
import CardForm from './CardForm';
import ColumnEditForm from './ColumnEditForm';

const stretch: Keyframes = keyframes({
  '0%': {
    transform: 'scale(0.3)',
    opacity: '0%',
    borderRadius: '100%',
    height: '0',
  },
  '100%': {
    transform: 'scale(1)',
    opacity: '100%',
  },
});

const style: SerializedStyles = css({
  display: 'flex',
  flexDirection: 'column',
  animation: `${stretch} 0.18s ease-in`,
  border: '2px lightgrey solid',
  borderRadius: '5px',
  backgroundColor: '#EEEEEE',
  height: '100%',
  minHeight: '50rem',
  minWidth: '20rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  paddingLeft: '0.1rem',
  paddingRight: '0.1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.4)',
});

interface ColumnProps {
  id: string;
  label: string;
}

function Column({ id, label }: ColumnProps) {
  // const dispatch = useAppDispatch();
  const [beingEdited, setBeingEdited] = useState(false);
  const [cardFormOpened, setCardFormOpened] = useState(false);
  const cards = useAppSelector((state) => state.cards.allCards);
  const cardsInThisColumn = cards.filter((card) => card.columnId === id);
  const cardIds = cardsInThisColumn.map((card) => card.id.toString());

  return (
    <Droppable id={id} key={id} style={style}>
      {!beingEdited && (
        <span css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p css={{ fontSize: '20px' }}>{label}</p>
          <button
            css={{
              border: '1px lightgrey solid',
              margin: '0.5rem',
              borderRadius: '15%',
              height: '2rem',
              boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'lightgray',
                transform: 'translateY(-2px)',
                boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
              },
            }}
            type="button"
            onClick={() => setBeingEdited(!beingEdited)}
          >
            <BsPenFill size={15} />
          </button>
        </span>
      )}
      {beingEdited && (
        <span>
          <ColumnEditForm
            id={id}
            prevLabel={label}
            beingEdited={beingEdited}
            setBeingEdited={setBeingEdited}
          />
          <button type="button" onClick={() => setBeingEdited(!beingEdited)}>Cancel</button>
        </span>
      )}
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cardsInThisColumn.map((card) => (
          <SortableItem
            key={card.id}
            id={card.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px lightgrey solid',
              backgroundColor: 'white',
              padding: '1rem',
              margin: '0.25rem',
              borderRadius: '5px',
              boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
              borderLeft: ` 3px${card.color} solid`,
            }}
          >
            <Card
              key={card.id}
              id={card.id}
              brief={card.brief}
              columnId={card.columnId}
              body={card.body}
              tags={card.tags}
            />
          </SortableItem>
        ))}
      </SortableContext>
      <button
        css={{
          borderRadius: '100%',
          border: 'none',
          padding: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(2px)',
          },
        }}
        type="button"
        onClick={() => setCardFormOpened(true)}
      >
        <IoMdAddCircle size="2rem" />
      </button>
      <CardForm
        cardFormOpened={cardFormOpened}
        setCardFormOpened={setCardFormOpened}
        columnId={id}
      />
    </Droppable>
  );
}

export default Column;
