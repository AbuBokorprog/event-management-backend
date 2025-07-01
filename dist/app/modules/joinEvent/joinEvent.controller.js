"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEventController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const joinEvent_service_1 = require("./joinEvent.service");
const join = (0, catchAsync_1.default)(async (req, res) => {
    const payload = {
        userId: req.user.id,
        eventId: req.body.eventId,
    };
    const result = await joinEvent_service_1.joinEventService.join(payload);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Event joined successfully!',
        data: result,
    });
});
const getMyJoinedEvents = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const result = await joinEvent_service_1.joinEventService.getMyJoinedEvents(userId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Fetched joined events',
        data: result,
    });
});
const getMyJoinedEvent = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;
    const result = await joinEvent_service_1.joinEventService.getMyJoinedEvent(userId, eventId);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Fetched joined event',
        data: result,
    });
});
exports.joinEventController = {
    join,
    getMyJoinedEvents,
    getMyJoinedEvent,
};
