/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Group, Modal } from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { BsPenFill } from 'react-icons/bs';
import { Tags, TagArray } from '../Tag';
import {
  briefStyle,
  cardHeaderStyle,
  cardStyle,
} from './styles/card.styles';
import CardEditForm from './CardEditForm';
import { cardEditButtonStyle } from './styles/cardEditForm.styles';

type CardProps = {
  id: string;
  brief: string;
  body: string | undefined,
  tags: RtStatic<typeof TagArray> | undefined,
};

function Card({
  id,
  brief,
  body,
  tags,
}: CardProps) {
  const [cardModalOpened, setCardModalOpened] = useState(false);
  const [cardEditFormOpened, setCardEditFormOpened] = useState(false);

  return (
    <div css={{ ...cardStyle, cursor: 'pointer' }}>
      <Group position="center" onClick={() => setCardModalOpened(true)}>
        <span>
          {brief}
        </span>
      </Group>
      {tags && <Tags tags={tags} />}
      <Modal
        opened={cardModalOpened}
        onClose={() => setCardModalOpened(false)}
        overlayBlur={3}
        overlayOpacity={0.55}
      >
        {!cardEditFormOpened && (
          <div>
            <div css={cardHeaderStyle}>
              <p css={briefStyle}>
                {brief}
              </p>
              {tags && <Tags tags={tags} />}
              <button
                css={cardEditButtonStyle}
                type="button"
                onClick={() => setCardEditFormOpened(true)}
              >
                <BsPenFill size={20} />
              </button>
            </div>
            {body}
          </div>
        )}
        {cardEditFormOpened && (
          <CardEditForm
            id={id}
            cardBrief={brief}
            cardBody={body}
            cardEditFormOpened={cardEditFormOpened}
            setCardEditFormOpened={setCardEditFormOpened}
          />
        )}
      </Modal>
    </div>
  );
}

export default Card;
