"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const event_model_1 = require("./event.model");
const createEvent = async (payload) => {
    return await event_model_1.Event.create(payload);
};
const getAllEvents = async () => {
    return await event_model_1.Event.find().sort({ dateTime: -1 });
};
const getMyEvents = async (userId) => {
    return await event_model_1.Event.find({ userId: userId }).sort({ dateTime: -1 });
};
const updateEvent = async (id, payload) => {
    return await event_model_1.Event.findByIdAndUpdate(id, payload, { new: true });
};
const deleteEvent = async (id) => {
    return await event_model_1.Event.findByIdAndDelete(id);
};
exports.eventService = {
    createEvent,
    getAllEvents,
    getMyEvents,
    updateEvent,
    deleteEvent,
};
