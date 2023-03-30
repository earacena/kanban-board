import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button,
  ColorInput,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setThemeColor } from './stores/settings.slice';
import { removeBoard, setSelectedBoard } from '../Board/stores/boards.slice';
import { removeCardsWithColumnId } from '../Card';

interface SettingsProps {
  settingsOpened: boolean,
  setSettingsOpened: (value: React.SetStateAction<boolean>) => void,
}

function Settings({
  settingsOpened,
  setSettingsOpened,
}: SettingsProps) {
  const dispatch = useAppDispatch();
  const { themeColor } = useAppSelector((state) => state.settings);
  const selectedBoardId = useAppSelector((state) => state.boards.selectedBoardId);
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
          <Button type="button" onClick={handleSetColor}>Save color</Button>

        </div>
        <Button variant="subtle" color="red" onClick={handleDeleteBoard}>{`Delete '${selectedBoard?.label}'`}</Button>
      </Stack>
    </Modal>
  );
}

export default Settings;
