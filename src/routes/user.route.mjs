import express from 'express';
import controller from '../mongoose/controllers/user.controller';
import withRoute from './Route/withRoute';
// import { asyncErrorMiddleware } from '../handlers/error.handler';

let router = express.Router();
router = withRoute(router, controller);

/**! New router path put over here **/

/**! New router path put over here **/
// router = ResourcesRoutes(router, controller);
export default router;
