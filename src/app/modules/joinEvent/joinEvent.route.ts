import express from 'express';
import { joinEventValidationSchema } from './joinEvent.validation';
import { joinEventController } from './joinEvent.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(joinEventValidationSchema),
  joinEventController.join,
);

router.get('/my-events', auth(), joinEventController.getMyJoinedEvents);

export const joinEventRoutes = router;
