import express from 'express';
import { eventController } from './event.controller';
import { createEventSchema, updateEventSchema } from './event.validation';
import auth from '../../middleware/auth';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(createEventSchema),
  eventController.createEvent,
);
router.get('/my-events', auth(), eventController.getMyEvents);
router.patch(
  '/:id',
  auth(),
  validateRequest(updateEventSchema),
  eventController.updateEvent,
);
router.delete('/:id', auth(), eventController.deleteEvent);

export const EventRoutes = router;
