"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEventService = void 0;
const joinEvent_model_1 = require("./joinEvent.model");
const event_model_1 = require("../event/event.model"); // Adjust import based on your structure
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const join = async (payload) => {
    const alreadyJoined = await joinEvent_model_1.JoinEvent.findOne({
        userId: payload.userId,
        eventId: payload.eventId,
    });
    if (alreadyJoined) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'You already joined this event');
    }
    const event = await event_model_1.Event.findById(payload.eventId);
    if (event?.attendeeCount == 0) {
        throw new AppError_1.AppError(http_status_1.default.NOT_ACCEPTABLE, 'All seat are booked!');
    }
    // Decrement attendee count
    await event_model_1.Event.findByIdAndUpdate(payload.eventId, {
        $inc: { attendeeCount: 1 },
    });
    const joined = await joinEvent_model_1.JoinEvent.create(payload);
    return joined;
};
const getMyJoinedEvents = async (userId) => {
    const events = await joinEvent_model_1.JoinEvent.find({ userId }).populate('eventId');
    return events;
};
const getMyJoinedEvent = async (userId, eventId) => {
    const event = await joinEvent_model_1.JoinEvent.findOne({ userId, eventId });
    return event;
};
exports.joinEventService = {
    join,
    getMyJoinedEvents,
    getMyJoinedEvent,
};
