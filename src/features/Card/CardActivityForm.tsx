/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button, Stack, Text,
} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { sortableItemStyle } from '../Column/styles/column.styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import activityServices from '../../services/activity.service';
import { addActivity } from '../Activity/stores/activity.store';

type Inputs = {
  description: string;
};

type CardActivityProps = {
  cardId: string;
};

function CardActivityForm({ cardId }: CardActivityProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      description: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ description }) => {
    if (session) {
      try {
        const newActivity = await activityServices.create({
          userId: session.id,
          cardId,
          type: 'contribution',
          description,
        });

        dispatch(addActivity({ activity: newActivity }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    } else {
      dispatch(
        addActivity({
          activity: {
            id: uuidv4(),
            cardId,
            userId: uuidv4(),
            type: 'contribution',
            description,
            dateCreated: new Date(),
          },
        }),
      );
    }

    reset({
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={{ display: 'flex', flexDirection: 'column' }}>
      <Stack>
        <textarea
          style={
            {
              ...sortableItemStyle,
              fontFamily: 'Open Sans',
              flexGrow: 1,
              resize: 'none',
              marginBottom: '0',
            } as React.CSSProperties
          }
          aria-label="activity content"
          placeholder="How have you contributed towards this task?"
          {...register('description', { required: true })}
        />
        <Text size="sm" color="red" align="center" css={{ marginTop: '0' }}>
          {errors.description?.type === 'required'
            ? 'Activity posts must have a description'
            : null}
        </Text>
      </Stack>
      <Button radius="xl" type="submit" css={{ marginRight: '5px', alignSelf: 'flex-end' }}>
        Post
      </Button>
    </form>
  );
}

export default CardActivityForm;
