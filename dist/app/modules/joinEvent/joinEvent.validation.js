"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEventValidationSchema = void 0;
const zod_1 = require("zod");
exports.joinEventValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, 'User ID is required'),
    eventId: zod_1.z.string().min(1, 'Event ID is required'),
});
