import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  setActiveCardId,
  setCardColumnId,
  resetActiveCardId,
  setCards,
} from './cards.slice';
import {
  addColumn,
} from './columns.slice';
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
    dispatch(setActiveCardId(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (over) {
      if (over.id.includes('column')) {
        dispatch(setCardColumnId({ id: active.id, newColumnId: over.id }));
      } else if (over.id.includes('card')) {
        const overCard = cards.find((card) => card.id === over.id);
        if (overCard) {
          dispatch(setCardColumnId({ id: active.id, newColumnId: overCard.columnId }));
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id.includes('card') && active.id !== over.id) {
      const oldCard = cards.find((card) => card.id === active.id);
      const newCard = cards.find((card) => card.id === over.id);
      if (oldCard && newCard) {
        const oldIndex = cards.indexOf(oldCard);
        const newIndex = cards.indexOf(newCard);
        const cardsCopy = [...cards];
        dispatch(setCards(arrayMove(cardsCopy, oldIndex, newIndex)));
      }
    }

    dispatch(resetActiveCardId());
  };

  const handleAddColumn = () => dispatch(addColumn({ label: 'Column' }));
  return (
    <div className="App">
      <button type="button" onClick={handleAddColumn}>
        Add column
      </button>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container />
      </DndContext>
    </div>
  );
}

export default App;
