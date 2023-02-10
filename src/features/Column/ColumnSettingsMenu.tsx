import React from 'react';
import { BsPen, BsThreeDotsVertical, BsTrashFill } from 'react-icons/bs';
import { ActionIcon, Menu } from '@mantine/core';

type ColumnSettingsMenuProps = {
  opened: boolean;
  setOpened: (value: React.SetStateAction<boolean>) => void;
  setBeingEdited: (value: React.SetStateAction<boolean>) => void;
  setBeingDeleted: (value: React.SetStateAction<boolean>) => void;
};

function ColumnSettingsMenu({
  opened,
  setOpened,
  setBeingEdited,
  setBeingDeleted,
}: ColumnSettingsMenuProps) {
  return (
    <Menu opened={opened} onChange={setOpened} position="right-start">
      <Menu.Target>
        <ActionIcon variant="subtle" radius="xl" color="dark">
          <BsThreeDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<BsPen />}
          onClick={() => {
            setBeingDeleted(false);
            setBeingEdited(true);
          }}
        >
          Edit column title
        </Menu.Item>

        <Menu.Item
          color="red"
          icon={<BsTrashFill />}
          onClick={() => {
            setBeingEdited(false);
            setBeingDeleted(true);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ColumnSettingsMenu;
