"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinEvent = void 0;
const mongoose_1 = require("mongoose");
const joinEventSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event', required: true },
    joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });
joinEventSchema.index({ userId: 1, eventId: 1 }, { unique: true });
exports.JoinEvent = (0, mongoose_1.model)('JoinEvent', joinEventSchema);
