import React, { useEffect, useState } from 'react';
import { Text, Timeline } from '@mantine/core';
import { useAppSelector } from '../../hooks';
import CardActivityForm from './CardActivityForm';

type CardActivityProps = {
  cardId: string,
};

function timeElapsedFromToday(dateInMs: number, currentDateInMs: number): string {
  // Returns a string with how much time has passed using the largest appropriate time unit
  const diffInMilliseconds = currentDateInMs - dateInMs;

  const millisecondsInSecond = 1000;
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = 1000 * 60 * 60;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30;
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;

  if (diffInMilliseconds > millisecondsInYear) {
    return `${Math.floor(diffInMilliseconds / millisecondsInYear)} years ago`;
  }
  if (diffInMilliseconds > millisecondsInMonth) {
    return `${Math.floor(diffInMilliseconds / millisecondsInMonth)} months ago`;
  }
  if (diffInMilliseconds > millisecondsInWeek) {
    return `${Math.floor(diffInMilliseconds / millisecondsInWeek)} weeks ago`;
  }
  if (diffInMilliseconds > millisecondsInDay) {
    return `${Math.floor(diffInMilliseconds / millisecondsInDay)} days ago`;
  }
  if (diffInMilliseconds > millisecondsInHour) {
    return `${Math.floor(diffInMilliseconds / millisecondsInHour)} hours ago`;
  }
  if (diffInMilliseconds > millisecondsInMinute) {
    return `${Math.floor(diffInMilliseconds / millisecondsInMinute)} minutes ago`;
  }
  if (diffInMilliseconds > millisecondsInSecond) {
    return `${Math.floor(diffInMilliseconds / millisecondsInSecond)} seconds ago`;
  }

  return '1 second ago';
}

function CardActivityTimeline({ cardId }: CardActivityProps) {
  const allActivities = useAppSelector((state) => state.activity.allActivities);
  const activities = allActivities.filter((a) => a.cardId === cardId);
  const [currentDateInMs, setCurrentDateInMs] = useState<number>(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateInMs(() => Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Timeline active={activities ? activities.length - 1 : 1}>
      {activities.map((event, idx) => (
        <Timeline.Item key={event.id} lineVariant={idx === activities.length - 1 ? 'dashed' : 'solid'}>
          <Text fw={300}>{event.description}</Text>
          <Text size="xs" color="dark">{timeElapsedFromToday(Number(new Date(event.dateCreated)), currentDateInMs)}</Text>
        </Timeline.Item>
      ))}
      <Timeline.Item>
        <CardActivityForm cardId={cardId} />
      </Timeline.Item>
    </Timeline>
  );
}

export default CardActivityTimeline;
