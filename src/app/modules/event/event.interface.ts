import { Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  name: string;
  dateTime: Date;
  location: string;
  description: string;
  attendeeCount: number;
  userId: string;
}
