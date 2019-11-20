const passport = require('passport');
const passportJWT = require('passport-jwt');
const _ = require('lodash');
const LocalStrategy = require('passport-local');
const CustomStrategy = require('passport-custom/lib');
const ImgurStrategy = require('passport-imgur/lib/passport-imgur').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').OAuthStrategy;
const Auth = require('../mongoose/models/auth.model');
const JWTSecurity = require('./jwt.security');

const passportPass = {};

passportPass.authenticate = (strategyName, options = { session: false }) => (req, res, next) => {
    switch (strategyName) {
        case 'local':
            passport.authenticate('local', options, (err, auth = {}, info) => {
                if (err) {
                    console.log(err);
                    next();
                }

                console.log(auth);
                const { id, user, role, username } = auth;
                req.login(auth, (err) => {
                    req.tokens = JWTSecurity.sign({ id, user, role, username });
                    next();
                });
            })(req, res, next);
            break;
        case 'imgur':
            passport.authenticate('imgur', options, (err, auth, info) => {
                if (err) {
                    next();
                }
                const { id, user, role, username } = auth;
                req.login(auth, (err) => {
                    req.tokens = JWTSecurity.sign({ id, user, role, username });
                    next();
                });
            })(req, res, next);
            break;
        case 'jwt':
            try {
                if (req.headers.authorization) {
                    const auth = JWTSecurity.verify(req.headers.authorization);
                    req.user = auth;
                } else if (req.query.token) {
                    const auth = JWTSecurity.verify(req.query.token);
                    req.user = auth;
                } else {
                    req.user = {};
                }
                next();
            } catch (err) {
                next(err);
            }
            break;
    }
};

const loadPassportStrategy = () => {
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
                    console.log(auth);
                    if (!auth || !(password === auth.password)) {
                        done(null, false, {
                            message: 'Incorrect email or password.'
                        });
                    } else {
                        done(null, auth, {
                            message: 'Logged In Successfully'
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        }
    );

    const jwtStrategy = new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRECT
        },
        (token, done) => {
            console.log(token);
            console.log('jwt');
            done(null, token);
        }
    );

    // const googleStrategy = new GoogleStrategy(
    //     {
    //         clientID: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //         callbackURL: process.env.HTTPS_DOMAIN_API + '/auth/google/callback'
    //     },
    //     function (accessToken, refreshToken, profile, done){
    //         console.log(accessToken);
    //         console.log(refreshToken);
    //         console.log(profile);
    //         done(null, {});
    //     }
    // );
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
                done(null, auth);
            } else {
                done(null, {});
            }
        }
    );
    passport.use(localStragey);
    passport.use(jwtStrategy);
    passport.use(imgurStrategy);
    // passport.use(googleStrategy);
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

    passport.serializeUser((auth, done) => {
        // console.log(user,"serializeUser")
        // done(null, user.id);
        done(null, auth.id);
    });

    passport.deserializeUser((id, done) => {
        Auth.findOne({ _id: id }, (err, auth) => {
            done(err, auth);
        });

        // User.findById(id, function (err, user){
        //     done(err, user);
        // });
        // done();
        // console.log(id);
    });
};
passportPass.loadPassportStrategy = loadPassportStrategy;
module.exports = passportPass;
// module.exports =  passportPass;
