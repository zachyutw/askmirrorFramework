import passport from 'passport';
import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';
import CustomStrategy from 'passport-custom';
import User from '../mongoose/models/user.model';
import Auth from '../mongoose/models/auth.model';
// import Auth from '../models/auth.model';
import config from '../../config';
const Passport = () => {
    const JWTStrategy = passportJWT.Strategy;
    const ExtractJWT = passportJWT.ExtractJwt;
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            (username, password, cb) => {
                return Auth.findOne({ username })
                    .then((auth) => {
                        return !auth || !(password === auth.password)
                            ? cb(null, false, {
                                  message: 'Incorrect email or password.'
                              })
                            : cb(null, auth.user, {
                                  message: 'Logged In Successfully'
                              });
                    })
                    .catch((err) => cb(err));
            }
        )
    );
    passport.use(
        'custom-strategy',
        new CustomStrategy((req, done) => {
            const { password, ...rest } = req.body;
            return Auth.findOne(rest)
                .then((auth) => {
                    return !auth || !(password === auth.password)
                        ? cb(null, false, {
                              message: 'Incorrect email or password.'
                          })
                        : cb(null, auth.user, {
                              message: 'Logged In Successfully'
                          });
                })
                .catch((err) => cb(err));
        })
    );
    passport.use(
        'openId-strategy',
        new CustomStrategy(async (req, done) => {
            try {
                const source = { ...req.query, ...req.body };
                const { openId } = source;
                let auth;
                let user;

                if (!auth) {
                    return done(null, false, {
                        error: true,
                        errorMessage: 'not correct format'
                    });
                }
                return done(
                    null,
                    {},
                    {
                        message: 'Sign In Success'
                    }
                );
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.CLIENT_SECRET
            },
            (token, done) => {
                return done(null, token);
            }
        )
    );

    passport.serializeUser((user, done) => {
        // console.log(user,"serializeUser")
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(id);
    });
};

export default Passport;
