/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Group, Modal, Text, Title,
} from '@mantine/core';
import React, { SetStateAction } from 'react';
import { BsCardText, BsTextLeft } from 'react-icons/bs';
import CardDescriptionForm from './CardDescriptionForm';

type ExpandedCardProps = {
  cardModalOpened: boolean;
  setCardModalOpened: (value: SetStateAction<boolean>) => void;
  brief: string;
  body: string | undefined;
  columnLabel: string,
};

function ExpandedCard({
  cardModalOpened,
  setCardModalOpened,
  brief,
  body,
  columnLabel,
}: ExpandedCardProps) {
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
          </Group>
        </Title>
        {body}
        {!body && (
          <CardDescriptionForm />
        )}
      </div>
    </Modal>
  );
}

export default ExpandedCard;
