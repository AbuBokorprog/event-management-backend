/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { eventService } from './event.service';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await eventService.createEvent(req.body);
  successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created',
    data: event,
  });
});

const getMyEvents = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const events = await eventService.getMyEvents(userId);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: 'My Events',
      data: events,
    });
  },
);

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await eventService.updateEvent(req.params.id, req.body);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event updated',
    data: event,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  await eventService.deleteEvent(req.params.id);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event deleted',
    data: null,
  });
});

export const eventController = {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
};
