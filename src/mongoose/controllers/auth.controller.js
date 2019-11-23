const Auth = require('../models/auth.model');
const _ = require('lodash');
const boom = require('boom');
// const sendMail = require('../../mail/mail');
// const nodemailer = require('nodemailer');
// const HomeTemplate = require('../../mail/components/Template/HomeTemplate');
const JWTSecurity = require('../../security/jwt.security');
const express = require('express');
const withRoute = require('./lib/withRoute');
const { asyncErrorMiddleware } = require('../../lib/error.handler');
// const axios = require('axios');
const passport = require('passport');
const passportStrategy = require('./lib/passport.strategy');

let controller = {};
let router = express.Router();

router.get(
    '/test',
    passportStrategy.authenticate('jwt'),
    asyncErrorMiddleware((req, res, next) => {
        res.send({ message: 'success', user: req.user.user });
    })
);
controller.deleteItem = async (req, res, next) => {
    console.log(req.user);
    res.send({ message: 'success' });
};
router.delete(
    '/',
    passportStrategy.authenticate('jwt'),
    asyncErrorMiddleware(controller.deleteItem)
);

controller.postSignUp = (req, res, next) => {
    // console.log(req.body);

    const { username, password } = req.body;
    if (!password) {
        next(boom.unauthorized('auth not success require password'));
    }
    Auth.postSignUp({ username, password }, req.query)
        .then(async (auth) => {
            console.log(auth);
            const { id, user, role, username } = auth;
            const tokens = JWTSecurity.sign(
                { id, user, role, username },
                { role: 'VERIFY_TOKEN' }
            );
            // const verifyMailConfig = ServerVerifyMailConfig(tokens, auth);
            // const mailInfo = await sendMail(verifyMailConfig);
            res.send({ message: 'sign up success', mailInfo: {}, tokens });
        })
        .catch((err) => {
            console.log(err);
            const errorStrs = err.message.split(' ');
            const preIndex = errorStrs.findIndex((str) => str === 'index:');
            const dupKey = errorStrs[preIndex + 1];
            next(boom.unauthorized('auth not success duplicate ' + dupKey));
        });

    // next(boom.internal('auth internal error'));
};
router.post('/signUp', asyncErrorMiddleware(controller.postSignUp));

controller.postSignIn = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    console.log(req.tokens);
    return res.send({
        message: 'sign in success',
        tokens: req.tokens,
        user: req.user.user
    });
};
router.post(
    '/signIn',
    passportStrategy.authenticate('local'),
    asyncErrorMiddleware(controller.postSignIn)
);

controller.getImgur = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    res.send({
        message: 'sign in success',
        tokens: req.tokens,
        user: req.user
    });
};
router.get(
    '/imgur/callback',
    passportStrategy.authenticate('imgur'),
    asyncErrorMiddleware(controller.getImgur)
);

router.get('/imgur', passport.authenticate('imgur'));

controller.getGoogle = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    res.send({
        message: 'sign in success',
        tokens: req.tokens,
        user: req.user
    });
};
router.get(
    '/google/callback',
    passportStrategy.authenticate('google'),
    asyncErrorMiddleware(controller.getGoogle)
);
router.get(
    '/google',
    passport.authenticate('google', { scope: [ 'profile' ] })
);

controller.getEmailVerifyCallback = async (req, res, next) => {
    // console.log(mail);
    if (_.isEmpty(req.user)) {
        throw boom.badRequest('auth not success');
    }
    res.send({ message: 'success', auth: req.user });
};
router.get(
    '/email/verify/callback',
    passportStrategy.authenticate('jwt'),
    asyncErrorMiddleware(controller.getEmailVerifyCallback)
);

controller.getEmailVerify = async (req, res, next) => {
    // const mailInfo = await sendMail(verifyMailConfig);
    // console.log(mail);
    res.send({ message: 'success', mailInfo: {} });
};
router.get('/email/verify', asyncErrorMiddleware(controller.getEmailVerify));

router = withRoute(router, controller);
/**! New router path put over here **/

/**! New router path put over here **/
// router = ResourcesRoutes(router, controller);
module.exports = router;
