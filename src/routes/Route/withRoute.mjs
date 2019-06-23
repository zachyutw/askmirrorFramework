import _ from 'lodash';
import { asyncErrorMiddleware } from '../../handlers/error.handler';

export default (router, controller) => {
    router.get(`/count`, asyncErrorMiddleware(controller.getListCount));
    router.get(`/schema`, asyncErrorMiddleware(controller.getSchema));
    router.post(`/`, asyncErrorMiddleware(controller.postItem));
    router.get(`/:id`, asyncErrorMiddleware(controller.getItem));
    router.put(`/:id`, asyncErrorMiddleware(controller.putItem));
    router.delete(`/:id`, asyncErrorMiddleware(controller.deleteItem));
    router.get(`/`, asyncErrorMiddleware(controller.getList));
    return router;
};
