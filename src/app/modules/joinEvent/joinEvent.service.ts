import { JoinEvent } from './joinEvent.model';
import { Event } from '../event/event.model'; // Adjust import based on your structure
import { IJoinEvent } from './joinEvent.interface';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

const join = async (payload: IJoinEvent) => {
  const alreadyJoined = await JoinEvent.findOne({
    userId: payload.userId,
    eventId: payload.eventId,
  });

  if (alreadyJoined) {
    throw new AppError(httpStatus.CONFLICT, 'You already joined this event');
  }

  const event = await Event.findById(payload.eventId);

  if (event?.attendeeCount == 0) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'All seat are booked!');
  }

  // Decrement attendee count
  await Event.findByIdAndUpdate(payload.eventId, {
    $inc: { attendeeCount: 1 },
  });

  const joined = await JoinEvent.create(payload);
  return joined;
};

const getMyJoinedEvents = async (userId: string) => {
  const events = await JoinEvent.find({ userId }).populate('eventId');
  return events;
};

const getMyJoinedEvent = async (userId: string, eventId: string) => {
  const event = await JoinEvent.findOne({ userId, eventId });
  return event;
};

export const joinEventService = {
  join,
  getMyJoinedEvents,
  getMyJoinedEvent,
};
