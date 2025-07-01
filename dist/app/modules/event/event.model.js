"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    attendeeCount: { type: Number, default: 0 },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
}, {
    timestamps: true,
});
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
