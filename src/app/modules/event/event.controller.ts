/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { EventService } from './event.service';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';

export const createEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await EventService.createEvent(req.body);
  successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created',
    data: event,
  });
});

export const getMyEvents = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const events = await EventService.getMyEvents(userId);
    successResponse(res, {
      statusCode: 200,
      success: true,
      message: 'My Events',
      data: events,
    });
  },
);

export const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await EventService.updateEvent(req.params.id, req.body);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event updated',
    data: event,
  });
});

export const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  await EventService.deleteEvent(req.params.id);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event deleted',
    data: null,
  });
});
