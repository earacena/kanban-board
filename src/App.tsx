import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { setCardColumnId } from './cards.slice';
import Container from './Container';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      dispatch(setCardColumnId({ id: Number(active.id), newColumnId: Number(over.id) }));
    }
  };

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        <Container />
      </DndContext>
    </div>
  );
}

export default App;
