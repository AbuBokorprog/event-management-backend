import { Schema, model } from 'mongoose';
import { IJoinEvent } from './joinEvent.interface';

const joinEventSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

joinEventSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export const JoinEvent = model<IJoinEvent>('JoinEvent', joinEventSchema);
