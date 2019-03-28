import _ from 'lodash';
import { asyncErrorMiddleware } from '../../handlers/error.handler';

export default (router, controller) => {
    // router.put('/list/ids', (req, res) => {
    //     controller.getIds(req, res);
    // });
    // router.post('/list', (req, res) => {
    //     controller.addMany(req, res);
    // });
    // router.get(`/list`, (req, res) => {
    //     controller.getList(req, res);
    // });
    // router.delete('/list', (req, res) => {
    //     controller.dropAll(req, res);
    // });
    // router.put('/list', (req, res) => {
    //     controller.updateList(req, res);
    // });
    // router.post('/item', (req, res) => {
    //     controller.setItem(req, res);
    // });
    // router.get('/item/schema', (req, res) => {
    //     controller.getSchema(req, res);
    // });
    // router.get('/item/:id?', (req, res) => {
    //     controller.getItem(req, res);
    // });
    // router.delete('/item/:id?', (req, res) => {
    //     controller.delete(req, res);
    // });
    // router.put('/item/:id?', (req, res) => {
    //     controller.update(req, res);
    // });
    router.get(`/count`, asyncErrorMiddleware(controller.getListCount));
    router.get(`/schema`, asyncErrorMiddleware(controller.getSchema));
    router.post(`/`, asyncErrorMiddleware(controller.postItem));
    router.get(`/:id`, asyncErrorMiddleware(controller.getItem));
    router.put(`/:id`, asyncErrorMiddleware(controller.putItem));
    router.delete(`/:id`, asyncErrorMiddleware(controller.deleteItem));
    router.get(`/`, asyncErrorMiddleware(controller.getList));
    return router;
};
