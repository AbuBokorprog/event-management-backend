import express from 'express';
import { EventRoutes } from '../modules/event/event.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { joinEventRoutes } from '../modules/joinEvent/joinEvent.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/join-events',
    route: joinEventRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
