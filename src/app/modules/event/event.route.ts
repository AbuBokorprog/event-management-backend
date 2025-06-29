import express from 'express';
import {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
} from './event.controller';
import { createEventSchema, updateEventSchema } from './event.validation';
import auth from '../../middleware/auth';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post('/', auth(), validateRequest(createEventSchema), createEvent);
router.get('/my-events', auth(), getMyEvents);
router.patch('/:id', auth(), validateRequest(updateEventSchema), updateEvent);
router.delete('/:id', auth(), deleteEvent);

export const EventRoutes = router;
