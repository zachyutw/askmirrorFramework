import express from 'express';
import controller from '../mongoose/controllers/auth.controller';
import withRoute from './Route/withRoute';
import { asyncErrorMiddleware } from '../handlers/error.handler';
// import withRoute from './Routes/resourcesRoutes';

let router = express.Router();
router = withRoute(router, controller);
router.post('signUp', asyncErrorMiddleware(controller.postSignUp));
router.post('signIn', asyncErrorMiddleware(controller.postSignUp));
/**! New router path put over here **/

/**! New router path put over here **/
// router = ResourcesRoutes(router, controller);
export default router;
