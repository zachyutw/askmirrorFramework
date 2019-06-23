import express from 'express';
import controller from '../mongoose/controllers/auth.controller';
import withRoute from './Route/withRoute';
import { asyncErrorMiddleware } from '../handlers/error.handler';
import axios from 'axios';
import passport from 'passport';
import passportStrategy from '../security/passport.strategy';
// import withRoute from './Routes/resourcesRoutes';

// const controllerFeild = {
//     postSignIn: { name: 'postSignIn', url: '/signIn', method: 'post' },
//     postSignUp: { name: 'postSignUp', url: '/signUp', method: 'post' }
// };
let router = express.Router();
router.get(
    '/test',
    passportStrategy.authenticate('jwt'),
    asyncErrorMiddleware((req, res, next) => {
        res.send({ message: 'success', user: req.user.user });
    })
);
router.delete('/', passportStrategy.authenticate('jwt'), asyncErrorMiddleware(controller.deleteItem));
router.post('/signUp', asyncErrorMiddleware(controller.postSignUp));
router.post('/signIn', passportStrategy.authenticate('local'), asyncErrorMiddleware(controller.postSignIn));
router.get('/imgur/callback', passportStrategy.authenticate('imgur'), asyncErrorMiddleware(controller.getImgur));
router.get('/imgur', passport.authenticate('imgur'));
router.get('/google/callback', passportStrategy.authenticate('google'), asyncErrorMiddleware(controller.getGoogle));
router.get('/google', passport.authenticate('google', { scope: [ 'profile' ] }));
router.get('/email/verify/callback', passportStrategy.authenticate('jwt'), asyncErrorMiddleware(controller.getEmailVerifyCallback));
router.get('/email/verify', asyncErrorMiddleware(controller.getEmailVerify));

router = withRoute(router, controller);
/**! New router path put over here **/

/**! New router path put over here **/
// router = ResourcesRoutes(router, controller);
export default router;
