import { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  name: string;
  dateTime: Date;
  location: string;
  description: string;
  photoUrl: string;
  attendeeCount: number;
  userId: Schema.Types.ObjectId;
}
