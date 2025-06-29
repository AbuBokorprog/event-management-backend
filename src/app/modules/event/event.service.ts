import { Event } from './event.model';
import { IEvent } from './event.interface';

const createEvent = async (payload: IEvent) => {
  return await Event.create(payload);
};

const getMyEvents = async (userId: string) => {
  return await Event.find({ userId }).sort({ dateTime: -1 });
};

const updateEvent = async (id: string, payload: Partial<IEvent>) => {
  return await Event.findByIdAndUpdate(id, payload, { new: true });
};

const deleteEvent = async (id: string) => {
  return await Event.findByIdAndDelete(id);
};

export const EventService = {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
};
