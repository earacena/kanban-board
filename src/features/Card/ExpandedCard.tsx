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
import { TagPickerForm, Tags, TagsType } from '../Tag';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateTags } from './stores/cards.slice';
import CardActivityTimeline from './CardActivityTimeline';

type ExpandedCardProps = {
  id: string;
  cardModalOpened: boolean;
  setCardModalOpened: (value: SetStateAction<boolean>) => void;
  brief: string;
  body: string | undefined;
  tags: TagsType | undefined;
  columnLabel: string;
};

function ExpandedCard({
  id,
  brief,
  body,
  tags,
  columnLabel,
  cardModalOpened,
  setCardModalOpened,
}: ExpandedCardProps) {
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.tags.allTags);

  const [cardDescriptionFormOpened, setCardDescriptionFormOpened] = useState(false);
  const [tagPickerOpened, setTagPickerOpened] = useState(false);

  const updateCardTags = (updatedTags: TagsType) => {
    dispatch(updateTags({ id, updatedTags }));
  };

  return (
    <Modal
      opened={cardModalOpened}
      onClose={() => setCardModalOpened(false)}
      overlayBlur={3}
      overlayOpacity={0.55}
      size="xl"
      radius="lg"
      title={(
        <Group align="center">
          <BsCardText size={26} />
          <Title order={1}>
            {brief}
          </Title>
          <Badge color="gray" size="lg" radius="sm" variant="filled">
            {columnLabel}
          </Badge>
        </Group>
      )}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '50px',
        }}
      >
        <Text fw={300} css={{ minWidth: 'fit-content' }}>Tags</Text>
        <Divider css={{ marginLeft: '10px' }} orientation="vertical" />
        {!tagPickerOpened && <Tags appliedTags={tags} size="xl" />}
        {tagPickerOpened && (
          <TagPickerForm
            tags={allTags}
            appliedTags={tags}
            updateCardTags={updateCardTags}
          />
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
