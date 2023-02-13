/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';
import { Modal } from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { BsPenFill } from 'react-icons/bs';
import { Tags, TagArray } from '../Tag';
import {
  briefStyle,
  cardHeaderStyle,
  cardStyle,
  expandCardButtonStyle,
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
    <div css={cardStyle}>
      <div>
        <span>
          {brief}
        </span>
        {body !== '' && (
          <button
            type="button"
            css={expandCardButtonStyle}
            onClick={() => setCardModalOpened(true)}
          >
            <GiOpenBook />
          </button>
        )}
      </div>
      {tags && <Tags tags={tags} />}
      <Modal opened={cardModalOpened} onClose={() => setCardModalOpened(false)}>
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
