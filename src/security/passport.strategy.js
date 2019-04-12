import passport from 'passport';
import passportJWT from 'passport-jwt';
import _ from 'lodash';
import LocalStrategy from 'passport-local';
import CustomStrategy from 'passport-custom';
import { Strategy as ImgurStrategy } from 'passport-imgur';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Auth from '../mongoose/models/auth.model';
// import Auth from '../models/auth.model';
import JWTTokens from './jwt.security';
import config from '../../config';

export const passportPass = {};

passportPass.authenticate = (strategyName, options = { session: false }) => (req, res, next) => {
    switch (strategyName) {
        case 'local':
            passport.authenticate(strategyName, options, (err, user, info) => {
                if (err) {
                    next();
                }
                req.login(user, (err) => {
                    req.tokens = JWTTokens(user);
                    next();
                });
            })(req, res, next);
        case 'imgur':
            passport.authenticate('imgur', options, (err, user, info) => {
                if (err) {
                    next();
                }
                req.login(user, (err) => {
                    req.tokens = JWTTokens(user);
                    next();
                });
            })(req, res, next);
    }
};

export const loadPassportStrategy = () => {
    const JWTStrategy = passportJWT.Strategy;
    const ExtractJWT = passportJWT.ExtractJwt;
    const localStragey = new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            return Auth.findOne({ username })
                .then((auth) => {
                    if (!auth || !(password === auth.password)) {
                        return done(null, false, {
                            message: 'Incorrect email or password.'
                        });
                    } else {
                        return done(null, auth.user, {
                            message: 'Logged In Successfully'
                        });
                    }
                })
                .catch((err) => done(err));
        }
    );
    const jwtStrategy = new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.CLIENT_SECRET
        },
        (token, done) => {
            return done(null, token);
        }
    );

    const googleStrategy = new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.HTTPS_DOMAIN_API + '/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done){
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            done(null, {});
        }
    );
    const imgurStrategy = new ImgurStrategy(
        {
            clientID: process.env.IMGUR_CLIENT_ID,
            clientSecret: process.env.IMGUR_CLIENT_SECRET,
            callbackURL: 'https://dev.askmirror.local:5001/api/auth/imgur/callback'
        },
        async function (accessToken, refreshToken, profile, done){
            const query = { provider: { imgur: { id: profile.id } } };
            const provider = {
                imgur: {
                    id: profile.id,
                    email: profile.email,
                    displayName: profile.url,
                    accessToken,
                    refreshToken
                }
            };
            const data = {
                username: _.head(profile.active_emails),
                provider
            };
            if (_.head(profile.active_emails)) {
                const auth = await Auth.signUpOrUpdate(query, data);
                done(null, auth.user);
            } else {
                done(null, {});
            }
        }
    );
    passport.use(localStragey);
    passport.use(jwtStrategy);
    passport.use(imgurStrategy);
    passport.use(googleStrategy);
    passport.use(
        'local-login',
        new CustomStrategy((req, done) => {
            const { password, ...rest } = req.body;
            return Auth.findOne(rest)
                .then((auth) => {
                    if (!auth || !(password === auth.password)) {
                        return done(null, false, {
                            message: 'Incorrect email or password.'
                        });
                    } else {
                        return done(null, auth.user, {
                            message: 'Logged In Successfully'
                        });
                    }
                })
                .catch((err) => done(err));
        })
    );

    passport.serializeUser((user, done) => {
        // console.log(user,"serializeUser")
        // done(null, user.id);
        console.log(user, 'serializeUser');
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(id, 'deserializeUser');
        done();
        // User.findById(id, function (err, user){
        //     done(err, user);
        // });
        // done();
        // console.log(id);
    });
};

export default passportPass;
