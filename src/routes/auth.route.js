const express = require('express');
const controller = require('../mongoose/controllers/auth.controller');
const withRoute = require('./Route/withRoute');
const { asyncErrorMiddleware } = require('../handlers/error.handler');
// const axios = require('axios');
const passport = require('passport');
const passportStrategy = require('../security/passport.strategy');
// const withRoute =require( './Routes/resourcesRoutes');

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
module.exports = router;
