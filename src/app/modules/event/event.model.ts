import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    attendeeCount: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export const Event = model<IEvent>('Event', eventSchema);
