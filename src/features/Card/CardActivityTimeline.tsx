import React from 'react';
import { Text, Timeline } from '@mantine/core';
import { useAppSelector } from '../../hooks';

type CardActivityProps = {
  cardId: string,
};

function timeElapsedFromToday(dateString: string): string {
  // Returns a string with how much time has passed using the largest appropriate time unit
  const utc1 = Date.UTC(
    new Date(Date.parse(dateString)).getFullYear(),
    new Date(Date.parse(dateString)).getMonth(),
    new Date(Date.parse(dateString)).getDate(),
  );
  const timeNow = new Date();
  const utc2 = Date.UTC(
    new Date(timeNow).getFullYear(),
    new Date(timeNow).getMonth(),
    new Date(timeNow).getDate(),
  );

  const diffInMilliseconds = utc2 - utc1;

  const millisecondsInSecond = 1000;
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = 1000 * 60 * 60;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30;
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;

  if (diffInMilliseconds > millisecondsInYear) {
    return `${diffInMilliseconds * millisecondsInYear} years ago`;
  }
  if (diffInMilliseconds > millisecondsInMonth) {
    return `${diffInMilliseconds * millisecondsInMonth} months ago`;
  }
  if (diffInMilliseconds > millisecondsInWeek) {
    return `${diffInMilliseconds * millisecondsInWeek} weeks ago`;
  }
  if (diffInMilliseconds > millisecondsInDay) {
    return `${diffInMilliseconds * millisecondsInDay} days ago`;
  }
  if (diffInMilliseconds > millisecondsInHour) {
    return `${diffInMilliseconds * millisecondsInHour} hours ago`;
  }
  if (diffInMilliseconds > millisecondsInMinute) {
    return `${diffInMilliseconds * millisecondsInMinute} minutes ago`;
  }
  if (diffInMilliseconds > millisecondsInSecond) {
    return `${diffInMilliseconds * millisecondsInSecond} seconds ago`;
  }

  return '1 second ago';
}

function CardActivityTimeline({ cardId }: CardActivityProps) {
  const allCards = useAppSelector((state) => state.cards.allCards);
  const card = allCards.find((c) => c.id === cardId);

  return (
    <Timeline active={1}>
      {card && card.activity.map((event) => (
        <Timeline.Item key={event.id}>
          <Text fw={300}>{event.content}</Text>
          <Text size="xs" color="dark">{timeElapsedFromToday(event.date)}</Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default CardActivityTimeline;
