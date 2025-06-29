import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    attendeeCount: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Event = model<IEvent>('Event', eventSchema);
