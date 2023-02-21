/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  ActionIcon,
  Badge,
  Group, Modal, Text, Title,
} from '@mantine/core';
import React, { SetStateAction, useState } from 'react';
import { BsCardText, BsTextLeft, BsPen } from 'react-icons/bs';
import CardDescriptionForm from './CardDescriptionForm';
import { TagPicker, Tags, TagsType } from '../Tag';
import { useAppSelector } from '../../hooks';

type ExpandedCardProps = {
  id: string,
  cardModalOpened: boolean,
  setCardModalOpened: (value: SetStateAction<boolean>) => void,
  brief: string,
  body: string | undefined,
  tags: TagsType | undefined,
  columnLabel: string,
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
  const allTags = useAppSelector((state) => state.tags.allTags);
  const [cardDescriptionFormOpened, setCardDescriptionFormOpened] = useState(false);
  const [appliedTags, setAppliedTags] = useState<TagsType | []>(tags ?? []);
  return (
    <Modal
      opened={cardModalOpened}
      onClose={() => setCardModalOpened(false)}
      overlayBlur={3}
      overlayOpacity={0.55}
      size="xl"
      radius="lg"
      title={(
        <Title order={1}>
          <Group align="center">
            <BsCardText />
            {brief}
            <Badge color="gray" size="lg" radius="sm" variant="filled">{columnLabel}</Badge>
          </Group>
        </Title>
      )}
    >
      <Group position="left" css={{ marginLeft: '50px' }}>
        {false && <Tags size="lg" /> }
        {false && (
        <TagPicker
          tags={allTags}
          appliedTags={appliedTags}
          setAppliedTags={setAppliedTags}
        />
        )}
      </Group>
      <div css={{ marginTop: '60px' }}>
        <Title order={2}>
          <Group
            align="center"
          >
            <BsTextLeft />
            Description
            {!cardDescriptionFormOpened && (
              <ActionIcon onClick={() => setCardDescriptionFormOpened(true)}>
                <BsPen />
              </ActionIcon>
            )}
          </Group>
        </Title>
        {!cardDescriptionFormOpened && (
          <Text fw={300} css={{ marginLeft: '42px', marginTop: '10px' }}>
            {body}
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
    </Modal>
  );
}

export default ExpandedCard;
