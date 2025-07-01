"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const event_service_1 = require("./event.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const createEvent = (0, catchAsync_1.default)(async (req, res) => {
    const event = await event_service_1.eventService.createEvent(req.body);
    (0, successRespon_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Event created',
        data: event,
    });
});
const getMyEvents = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const events = await event_service_1.eventService.getMyEvents(userId);
    (0, successRespon_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'My Events',
        data: events,
    });
});
const getAllEvents = (0, catchAsync_1.default)(async (req, res) => {
    const events = await event_service_1.eventService.getAllEvents();
    (0, successRespon_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All Events',
        data: events,
    });
});
const updateEvent = (0, catchAsync_1.default)(async (req, res) => {
    const event = await event_service_1.eventService.updateEvent(req.params.id, req.body);
    (0, successRespon_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Event updated',
        data: event,
    });
});
const deleteEvent = (0, catchAsync_1.default)(async (req, res) => {
    await event_service_1.eventService.deleteEvent(req.params.id);
    (0, successRespon_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Event deleted',
        data: null,
    });
});
exports.eventController = {
    createEvent,
    getAllEvents,
    getMyEvents,
    updateEvent,
    deleteEvent,
};
