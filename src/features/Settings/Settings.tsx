import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button, ColorInput, Divider, Modal, Stack, Text,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setThemeColor } from './stores/settings.slice';
import { removeBoard, setSelectedBoard } from '../Board/stores/boards.slice';
import { removeCardsWithColumnId } from '../Card';
import { DeleteConfirmationModal } from '../../components';
import { BoardEditForm } from '../Board';

interface SettingsProps {
  settingsOpened: boolean;
  setSettingsOpened: (value: React.SetStateAction<boolean>) => void;
}

function Settings({ settingsOpened, setSettingsOpened }: SettingsProps) {
  const dispatch = useAppDispatch();
  const [beingDeleted, setBeingDeleted] = useState(false);
  const { themeColor } = useAppSelector((state) => state.settings);
  const selectedBoardId = useAppSelector(
    (state) => state.boards.selectedBoardId,
  );
  const boards = useAppSelector((state) => state.boards.allBoards);
  const selectedBoard = boards.find((b) => b.id === selectedBoardId);
  const [color, setColor] = useState(themeColor);
  const columns = useAppSelector((state) => state.columns.allColumns);
  const columnsInBoard = columns.filter((c) => c.boardId === selectedBoardId);

  const handleSetColor = () => dispatch(setThemeColor({ themeColor: color }));

  const handleDeleteBoard = () => {
    columnsInBoard.forEach((c) => {
      dispatch(removeCardsWithColumnId({ columnId: c.id }));
    });

    dispatch(removeBoard({ boardId: selectedBoardId }));
    setSettingsOpened(false);
    dispatch(setSelectedBoard({ boardId: '' }));
  };

  return (
    <Modal
      opened={settingsOpened}
      onClose={() => setSettingsOpened(false)}
      title="Settings"
    >
      <Stack align="center">
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <Text size="sm" weight={500}>
            Background color
          </Text>
          <ColorInput
            css={{ marginBottom: '1rem' }}
            format="hex"
            value={color}
            onChange={setColor}
          />
          <Button type="button" onClick={handleSetColor}>
            Save color
          </Button>
        </div>
        <Divider />
        {selectedBoard && (
          <BoardEditForm
            boardId={selectedBoard?.id}
            boardLabel={selectedBoard?.label}
          />
        )}
        <Divider />
        <Button
          variant="outline"
          color="red"
          onClick={() => setBeingDeleted(true)}
        >
          {`Delete '${selectedBoard?.label}'`}
        </Button>
        <DeleteConfirmationModal
          opened={beingDeleted}
          setOpened={setBeingDeleted}
          handleDelete={handleDeleteBoard}
          label={`Delete board '${selectedBoard?.label}'`}
        />
      </Stack>
    </Modal>
  );
}

export default Settings;
