/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  ActionIcon, Badge, Divider, Group, Modal, Text, Title,
} from '@mantine/core';
import React, { SetStateAction, useState } from 'react';
import { BsCardText, BsTextLeft, BsPen } from 'react-icons/bs';
import { FiActivity } from 'react-icons/fi';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import CardDescriptionForm from './CardDescriptionForm';
import { TagPickerForm, Tags } from '../Tag';
import CardActivityTimeline from './CardActivityTimeline';
import CardSettingsMenu from './CardSettingsMenu';
import CardBriefEditForm from './CardBriefEditForm';

type ExpandedCardProps = {
  id: string;
  cardModalOpened: boolean;
  setCardModalOpened: (value: SetStateAction<boolean>) => void;
  setBeingDeleted: (value: SetStateAction<boolean>) => void;
  brief: string;
  body: string;
  columnLabel: string;
};

function ExpandedCard({
  id,
  brief,
  body,
  columnLabel,
  cardModalOpened,
  setBeingDeleted,
  setCardModalOpened,
}: ExpandedCardProps) {
  const [cardDescriptionFormOpened, setCardDescriptionFormOpened] = useState<boolean>(false);
  const [tagPickerOpened, setTagPickerOpened] = useState<boolean>(false);
  const [cardSettingsOpened, setCardSettingsOpened] = useState<boolean>(false);
  const [beingEdited, setBeingEdited] = useState<boolean>(false);

  return (
    <Modal
      opened={cardModalOpened}
      onClose={() => setCardModalOpened(false)}
      size="xl"
      radius="lg"
    >

      <div css={{ marginBottom: '50px' }}>
        {beingEdited ? (
          <CardBriefEditForm
            cardId={id}
            cardBrief={brief}
            setCardBriefEditFormOpened={setBeingEdited}
          />
        ) : (
          <Group align="center">
            <BsCardText size={26} />
            <Title order={1}>
              {brief}
            </Title>
            <Badge color="gray" size="lg" radius="sm" variant="filled">
              {columnLabel}
            </Badge>
            <CardSettingsMenu
              opened={cardSettingsOpened}
              setOpened={setCardSettingsOpened}
              setBeingEdited={setBeingEdited}
              setBeingDeleted={setBeingDeleted}
            />
          </Group>
        )}
      </div>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '43px',
        }}
      >
        <Text fw={300} css={{ minWidth: 'fit-content' }}>Tags</Text>
        <Divider css={{ marginLeft: '10px' }} orientation="vertical" />
        {!tagPickerOpened && <Tags cardId={id} size="xl" />}
        {tagPickerOpened && (
          <TagPickerForm cardId={id} />
        )}
        <ActionIcon
          variant="filled"
          onClick={() => setTagPickerOpened(!tagPickerOpened)}
          css={{ marginLeft: '10px' }}
        >
          {tagPickerOpened && <MdArrowBackIosNew />}
          {!tagPickerOpened && <MdArrowForwardIos />}
        </ActionIcon>
      </div>
      <div css={{ marginTop: '60px' }}>
        <Group align="center">
          <BsTextLeft size={26} />
          <Title order={2}>
            Description
          </Title>
          {!cardDescriptionFormOpened && (
            <ActionIcon onClick={() => setCardDescriptionFormOpened(true)}>
              <BsPen />
            </ActionIcon>
          )}
        </Group>
        {!cardDescriptionFormOpened && (
          <Text fw={300} css={{ marginLeft: '42px', marginTop: '10px' }} color={!body ? 'dimmed' : ''}>
            {body}
            {!body && 'No description provided.'}
          </Text>
        )}
        {cardDescriptionFormOpened && (
          <CardDescriptionForm
            id={id}
            cardBody={body}
            setCardDescriptionFormOpened={setCardDescriptionFormOpened}
          />
        )}
      </div>
      <div css={{ marginTop: '60px' }}>
        <Group>
          <FiActivity size={26} />
          <Title order={2}>
            Activity
          </Title>
        </Group>
        <div css={{ marginTop: '10px', marginLeft: '45px' }}>
          <CardActivityTimeline cardId={id} />
        </div>
      </div>
    </Modal>
  );
}

export default ExpandedCard;
