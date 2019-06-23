import Auth from '../models/auth.model';
import _ from 'lodash';
import boom from 'boom';
import sendMail from '../../mail/mail';
import nodemailer from 'nodemailer';
import withController from './Controller/withController';
import HomeTemplate from '../../mail/components/Template/HomeTemplate';
import JWTSecurity from '../../security/jwt.security';
const Model = Auth;
const ModelName = _.lowerCase(Model.collection.name);
const ModelListName = ModelName + 's';
// let controller = resourcesController(Model, Model.collection.name);

const ServerVerifyMailConfig = (tokens, auth) => {
    const html = HomeTemplate(
        {
            field: {
                text: 'Please Verify Your Email',
                href: 'https://dev.askmirror.local:5001/api/auth/email/verify/callback?status=success&method=verifyMail&token=' + tokens.accessToken
            },
            greeding: 'Hi ' + auth.user.name + ' Welcome'
        },
        { title: 'Verify' }
    );
    const verifyMailConfig = {
        from: ' no-relpy-jslandclan@gmail.com',
        to: auth.username,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        cc: '',
        bcc: '',
        html,
        attachments: []
    };
    return verifyMailConfig;
};
let controller = {};
controller = withController(Model, controller);

controller.deleteItem = async (req, res, next) => {
    console.log(req.user);
    res.send({ message: 'success' });
};

controller.postSignUp = (req, res, next) => {
    // console.log(req.body);

    const { username, password } = req.body;
    if (!password) {
        next(boom.unauthorized('auth not success require password'));
    }
    Model.postSignUp({ username, password }, req.query)
        .then(async (auth) => {
            console.log(auth);
            const { id, user, role, username } = auth;
            const tokens = JWTSecurity.sign({ id, user, role, username }, { role: 'VERIFY_TOKEN' });
            const verifyMailConfig = ServerVerifyMailConfig(tokens, auth);
            const mailInfo = await sendMail(verifyMailConfig);
            res.send({ message: 'sign up success', mailInfo, tokens });
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
controller.postSignIn = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    console.log(req.tokens);
    return res.send({ message: 'sign in success', tokens: req.tokens, user: req.user.user });
};

controller.getImgur = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    res.send({ message: 'sign in success', tokens: req.tokens, user: req.user });
};
controller.getGoogle = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    res.send({ message: 'sign in success', tokens: req.tokens, user: req.user });
};

controller.getEmailVerify = async (req, res, next) => {
    const verifyMailConfig = {
        from: ' no-relpy-jslandclan@gmail.com',
        to: 'askmirror@yandex.ru',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        cc: '',
        bcc: '',
        html: HomeTemplate({ token: 'qwer1234' }, { title: 'Home' }),
        attachments: []
    };
    const mailInfo = await sendMail(verifyMailConfig);
    // console.log(mail);
    res.send({ message: 'success', mailInfo });
};
controller.getEmailVerifyCallback = async (req, res, next) => {
    // console.log(mail);
    if (_.isEmpty(req.user)) {
        throw boom.badRequest('auth not success');
    }
    res.send({ message: 'success', auth: req.user });
};
export default controller;
