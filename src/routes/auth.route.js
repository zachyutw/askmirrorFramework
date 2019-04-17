import express from 'express';
import controller from '../mongoose/controllers/auth.controller';
import withRoute from './Route/withRoute';
import { asyncErrorMiddleware } from '../handlers/error.handler';
import axios from 'axios';
import passport from 'passport';
import passportPass from '../security/passport.strategy';
// import withRoute from './Routes/resourcesRoutes';

let router = express.Router();
router.get(
    '/test',
    passportPass.authenticate('jwt'),
    asyncErrorMiddleware((req, res, next) => {
        res.send({ message: 'success', user: req.user.user });
    })
);
router.post('/signUp', asyncErrorMiddleware(controller.postSignUp));
router.post('/signIn', passportPass.authenticate('local'), asyncErrorMiddleware(controller.postSignIn));
router.get('/imgur/callback', passportPass.authenticate('imgur'), asyncErrorMiddleware(controller.getImgur));
router.get('/imgur', passport.authenticate('imgur'));
router.get('/google/callback', passportPass.authenticate('google'), asyncErrorMiddleware(controller.getGoogle));
router.get('/google', passport.authenticate('google', { scope: [ 'profile' ] }));
router.get(
    '/email/verify/callback',
    passportPass.authenticate('jwt'),
    asyncErrorMiddleware(controller.getEmailVerifyCallback)
);
router.get('/email/verify', asyncErrorMiddleware(controller.getEmailVerify));

router = withRoute(router, controller);
/**! New router path put over here **/

/**! New router path put over here **/
// router = ResourcesRoutes(router, controller);
export default router;
