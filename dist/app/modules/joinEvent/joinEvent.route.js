"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const joinEvent_validation_1 = require("./joinEvent.validation");
const joinEvent_controller_1 = require("./joinEvent.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), (0, validateRequest_1.default)(joinEvent_validation_1.joinEventValidationSchema), joinEvent_controller_1.joinEventController.join);
router.get('/my-events', (0, auth_1.default)(), joinEvent_controller_1.joinEventController.getMyJoinedEvents);
router.get('/my-events/details/:id', (0, auth_1.default)(), joinEvent_controller_1.joinEventController.getMyJoinedEvent);
exports.joinEventRoutes = router;
