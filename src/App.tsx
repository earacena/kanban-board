import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  setActiveCardId,
  setCardColumnId,
  resetActiveCardId,
  setCards,
} from './cards.slice';
import Container from './Container';
import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.allCards);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    dispatch(setActiveCardId(Number(event.active.id)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch(setCardColumnId({ id: Number(active.id), newColumnId: Number(over.id) }));

      const oldCard = cards.find((card) => card.id === Number(active.id));
      const newCard = cards.find((card) => card.id === Number(over.id));
      if (oldCard && newCard) {
        const oldIndex = cards.indexOf(oldCard);
        const newIndex = cards.indexOf(newCard);
        const cardsCopy = [...cards];
        dispatch(setCards(arrayMove(cardsCopy, oldIndex, newIndex)));
      }
    }

    // const { active, over } = event;
    // if (over) {
    //   dispatch(setCardColumnId({ id: Number(active.id), newColumnId: Number(over.id) }));
    // }

    dispatch(resetActiveCardId());
  };

  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Container />
      </DndContext>
    </div>
  );
}

export default App;
