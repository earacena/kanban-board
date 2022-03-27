import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { setActiveCardId, setCardColumnId, resetActiveCardId } from './cards.slice';
import Container from './Container';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();

  const handleDragStart = (event: DragStartEvent) => {
    dispatch(setActiveCardId(Number(event.active.id)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      dispatch(setCardColumnId({ id: Number(active.id), newColumnId: Number(over.id) }));
    }

    dispatch(resetActiveCardId());
  };

  return (
    <div className="App">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Container />
      </DndContext>
    </div>
  );
}

export default App;
