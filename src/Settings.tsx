import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ColorInput, Modal, DEFAULT_THEME } from '@mantine/core';
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
          format="hex"
          value={color}
          onChange={setColor}
          withPicker={false}
          disallowInput
          swatches={[
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.orange,
            ...DEFAULT_THEME.colors.yellow,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.blue,
            ...DEFAULT_THEME.colors.grape,
            ...DEFAULT_THEME.colors.dark,
          ]}
        />
        <button type="button" onClick={handleSetColor}>Save color</button>
      </div>
    </Modal>
  );
}

export default Settings;
