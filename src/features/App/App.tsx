/** @jsxRuntime classic */
import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/react';
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
  removeCard,
  setActiveCardId,
  setCardColumnId,
  resetActiveCardId,
  setCards,
} from '../Card';
import { addColumn } from '../Column';
import { Container } from '../Container';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TagForm } from '../Tag';
import {
  appStyle,
  globalStyle,
} from './styles/app.styles';
import { Settings } from '../Settings';
import NavBar from '../NavBar';

function App() {
  const dispatch = useAppDispatch();
  const [tagFormOpened, setTagFormOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const cards = useAppSelector((state) => state.cards.allCards);
  const { themeColor } = useAppSelector((state) => state.settings);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    document.title = 'Kanban Board';
  }, []);

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
    if (over && over.id.includes('trash') && active.id !== over.id) {
      // Card dragged to trashable area, therefore delete
      dispatch(removeCard({ id: active.id }));
    }
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
    <div
      className="App"
      css={appStyle}
    >
      <Global
        styles={css({ ...globalStyle, body: { backgroundColor: themeColor } })}
      />
      <NavBar
        handleAddColumn={handleAddColumn}
        setTagFormOpened={setTagFormOpened}
        setSettingsOpened={setSettingsOpened}
      />
      <TagForm tagFormOpened={tagFormOpened} setTagFormOpened={setTagFormOpened} />
      <Settings settingsOpened={settingsOpened} setSettingsOpened={setSettingsOpened} />
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
