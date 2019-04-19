import express from 'express';
import controller from '../mongoose/controllers/tpl.controller';
import withRoute from './Route/withRoute';
// import { asyncErrorMiddleware } from '../handlers/error.handler';
let router = express.Router();
/**! New router path put over here **/

/**! New router path put over here **/
router = withRoute(router, controller);
export default router;
