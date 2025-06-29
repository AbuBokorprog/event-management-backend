import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(3),
  name: z.string(),
  dateTime: z.string().datetime(),
  location: z.string(),
  description: z.string(),
  attendeeCount: z.number().default(0),
  userId: z.string(),
});

export const updateEventSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  dateTime: z.string().datetime().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});
