import express from 'express';
// import controller from '../mongoose/controllers/tpl.controller';
import withRoute from './Route/withRoute';
import { asyncErrorMiddleware } from '../handlers/error.handler';
import controller from '../crawler/crawler.controller';
let router = express.Router();
/**! New router path put over here **/

/**! New router path put over here **/
router.get('/html', asyncErrorMiddleware(controller['getHtml']));
router.get('/ck101', asyncErrorMiddleware(controller['getCk101']));
router = withRoute(router, controller);
export default router;
