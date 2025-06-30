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

  // Increase attendee count
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

export const joinEventService = {
  join,
  getMyJoinedEvents,
};
