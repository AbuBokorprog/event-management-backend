"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_route_1 = require("../modules/event/event.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const joinEvent_route_1 = require("../modules/joinEvent/joinEvent.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/events',
        route: event_route_1.EventRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/join-events',
        route: joinEvent_route_1.joinEventRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
