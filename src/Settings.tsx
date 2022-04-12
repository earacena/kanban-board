import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ColorInput, Modal } from '@mantine/core';
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
        Background color
        <ColorInput
          css={{ marginBottom: '1rem' }}
          format="hex"
          value={color}
          onChange={setColor}
        />
        <button type="button" onClick={handleSetColor}>Save color</button>
      </div>
    </Modal>
  );
}

export default Settings;
