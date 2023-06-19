/** @jsxRuntime classic */
import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { Global, jsx, css } from '@emotion/react';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Route, Routes } from 'react-router-dom';
import { notifications, Notifications } from '@mantine/notifications';
import { v4 as uuidv4 } from 'uuid';

import {
  setActiveCardId,
  setCardColumnId,
  resetActiveCardId,
  setCards,
} from '../Card';
import { addColumn } from '../Column';
import { Container } from '../Container';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { appStyle, globalStyle } from './styles/app.styles';
import { Settings } from '../Settings';
import NavBar from '../NavBar';
import { SideBar, CollapsableSideBar } from '../SideBar';
import LoginForm from '../Login';
import RegisterForm from '../Login/RegisterForm';
import userService from '../../services/user.service';
import columnService from '../../services/column.service';
import { setIsFetching, setUser } from '../Auth';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';

function App() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const cards = useAppSelector((state) => state.cards.allCards);
  const columns = useAppSelector((state) => state.columns.allColumns);
  const selectedBoardId = useAppSelector((state) => state.boards.selectedBoardId);
  const { themeColor } = useAppSelector((state) => state.settings);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [sideBarOpened, setSideBarOpened] = useState(false);

  // Use existing session cookies to fetch current user if not logged out in server
  useEffect(() => {
    dispatch(setIsFetching({ isFetching: true }));
    const fetchSession = async () => {
      try {
        const userSession = await userService.fetchUserSession();
        dispatch(setUser({ user: userSession }));
      } catch (error: unknown) {
        const decoded = ErrorType.parse(error);
        logger.logError(decoded);
      }
      dispatch(setIsFetching({ isFetching: false }));
    };

    fetchSession();
  }, []);

  useEffect(() => {
    notifications.show({
      title: 'Give it a try!',
      message: 'Nothing will be saved unless you are logged in. Once you create an account and log in, everything will be reset and saved from that point on.',
    });
  }, []);

  // Set tab title
  useEffect(() => {
    document.title = 'Kanban Board';
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    dispatch(setActiveCardId({ activeCardId: event.active.id }));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (over) {
      // Determine if column or card
      const overColumn = columns.find((c) => c.id === over.id);
      const overCard = cards.find((c) => c.id === over.id);

      if (overColumn) {
        dispatch(setCardColumnId({ cardId: active.id, newColumnId: over.id }));
      } else if (overCard) {
        dispatch(
          setCardColumnId({ cardId: active.id, newColumnId: overCard.columnId }),
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const overCard = cards.find((c) => c.id === over.id);
      if (overCard && active.id !== over.id) {
        const oldCard = cards.find((card) => card.id === active.id);
        const newCard = cards.find((card) => card.id === over.id);
        if (oldCard && newCard) {
          const oldIndex = cards.indexOf(oldCard);
          const newIndex = cards.indexOf(newCard);
          const cardsCopy = [...cards];
          dispatch(
            setCards({ allCards: arrayMove(cardsCopy, oldIndex, newIndex) }),
          );
        }
      }
    }

    dispatch(resetActiveCardId());
  };

  const handleAddColumn = async () => {
    try {
      if (selectedBoardId && session) {
        const newColumn = await columnService.create({
          userId: session.id,
          label: 'New Board',
          boardId: selectedBoardId,
        });

        dispatch(addColumn({ column: newColumn }));
      } else {
        // User is not logged in, or guest is trying out application
        dispatch(addColumn({
          column: {
            id: uuidv4(),
            userId: uuidv4(),
            label: 'Column',
            boardId: selectedBoardId,
            dateCreated: new Date(),
          },
        }));
      }
    } catch (err: unknown) {
      const decoded = ErrorType.parse(err);
      logger.logError(decoded);
    }
  };

  const appWithSidebar = () => (
    <div css={appStyle}>
      <SideBar />
      <CollapsableSideBar sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened} />
      <div
        css={{
          display: sideBarOpened ? 'none' : 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {selectedBoardId && (
          <NavBar
            handleAddColumn={handleAddColumn}
            setSettingsOpened={setSettingsOpened}
          />
        )}
        <Settings
          settingsOpened={settingsOpened}
          setSettingsOpened={setSettingsOpened}
        />
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
    </div>
  );

  return (
    <div className="App" css={appStyle}>
      <Global
        styles={css({
          ...globalStyle,
          html: {
            height: '100%',
          },
          body: {
            backgroundColor: themeColor,
            margin: 0,
            padding: 0,
            maxHeight: '100vh',
            overflow: 'hidden',
            fontFamily: 'Open Sans',
          },
        })}
      />
      <Routes>
        <Route
          path="/"
          element={appWithSidebar()}
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
      </Routes>
      <Notifications position="bottom-center" />
    </div>
  );
}

export default App;
