"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    name: zod_1.z.string(),
    dateTime: zod_1.z.string(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
    photoUrl: zod_1.z.string(),
    attendeeCount: zod_1.z.number().default(0),
    userId: zod_1.z.string(),
});
exports.updateEventSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    dateTime: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().optional(),
});
