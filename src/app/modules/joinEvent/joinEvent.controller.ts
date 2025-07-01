/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';
import { joinEventService } from './joinEvent.service';

const join = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const payload = {
      userId: req.user.id,
      eventId: req.body.eventId,
    };

    const result = await joinEventService.join(payload);

    successResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Event joined successfully!',
      data: result,
    });
  },
);

const getMyJoinedEvents = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const result = await joinEventService.getMyJoinedEvents(userId);

    successResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched joined events',
      data: result,
    });
  },
);

const getMyJoinedEvent = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const eventId = req.params.id;
    const result = await joinEventService.getMyJoinedEvent(userId, eventId);

    successResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched joined event',
      data: result,
    });
  },
);

export const joinEventController = {
  join,
  getMyJoinedEvents,
  getMyJoinedEvent,
};
