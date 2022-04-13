import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Button,
  ColorInput,
  Modal,
  Text,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from './hooks';
import { setThemeColor } from './settings.slice';

interface SettingsProps {
  settingsOpened: boolean,
  setSettingsOpened: (value: React.SetStateAction<boolean>) => void,
}

function Settings({ settingsOpened, setSettingsOpened }: SettingsProps) {
  const dispatch = useAppDispatch();
  const { themeColor } = useAppSelector((state) => state.settings);
  const [color, setColor] = useState(themeColor);

  const handleSetColor = () => dispatch(setThemeColor({ themeColor: color }));

  return (
    <Modal
      opened={settingsOpened}
      onClose={() => setSettingsOpened(false)}
      title="Settings"
    >
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
    </Modal>
  );
}

export default Settings;
