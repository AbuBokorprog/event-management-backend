"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const event_validation_1 = require("./event.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), (0, validateRequest_1.default)(event_validation_1.createEventSchema), event_controller_1.eventController.createEvent);
router.get('/', event_controller_1.eventController.getAllEvents);
router.get('/my-events', (0, auth_1.default)(), event_controller_1.eventController.getMyEvents);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(event_validation_1.updateEventSchema), event_controller_1.eventController.updateEvent);
router.delete('/:id', (0, auth_1.default)(), event_controller_1.eventController.deleteEvent);
exports.EventRoutes = router;
