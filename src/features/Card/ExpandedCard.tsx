/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  ActionIcon,
  Group, Modal, Text, Title,
} from '@mantine/core';
import React, { SetStateAction, useState } from 'react';
import { BsCardText, BsTextLeft, BsPen } from 'react-icons/bs';
import CardDescriptionForm from './CardDescriptionForm';

type ExpandedCardProps = {
  id: string;
  cardModalOpened: boolean;
  setCardModalOpened: (value: SetStateAction<boolean>) => void;
  brief: string;
  body: string | undefined;
  columnLabel: string,
};

function ExpandedCard({
  id,
  brief,
  body,
  columnLabel,
  cardModalOpened,
  setCardModalOpened,
}: ExpandedCardProps) {
  const [cardDescriptionFormOpened, setCardDescriptionFormOpened] = useState(false);

  return (
    <Modal
      opened={cardModalOpened}
      onClose={() => setCardModalOpened(false)}
      overlayBlur={3}
      overlayOpacity={0.55}
      size="xl"
      title={(
        <Title order={1}>
          <Group align="center">
            <BsCardText />
            {brief}
          </Group>
        </Title>
      )}
    >
      <Text fw={300}>{`In column '${columnLabel}'`}</Text>
      <div>
        <Title order={2}>
          <Group align="center">
            <BsTextLeft />
            Description
            {!cardDescriptionFormOpened && (
              <ActionIcon onClick={() => setCardDescriptionFormOpened(true)}>
                <BsPen />
              </ActionIcon>
            )}
          </Group>
        </Title>
        {body}
        {cardDescriptionFormOpened && (
          <CardDescriptionForm
            id={id}
            cardBody={body}
            setCardDescriptionFormOpened={setCardDescriptionFormOpened}
          />
        )}
      </div>
    </Modal>
  );
}

export default ExpandedCard;
