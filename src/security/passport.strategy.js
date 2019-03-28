import passport from 'passport';
import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';
import CustomStrategy from 'passport-custom';
import User from '../mongoose/models/user.model';
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
                    .then(
                        (auth) =>
                            !auth || !(password === auth.password)
                                ? cb(null, false, {
                                      message: 'Incorrect email or password.'
                                  })
                                : cb(null, auth.toObject(), {
                                      message: 'Logged In Successfully'
                                  })
                    )
                    .catch((err) => cb(err));
            }
        )
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
        'custom-strategy',
        new CustomStrategy(async (req, done) => {
            try {
                const { username, email, phoneNumber, password } = req.body;
                let auth;
                let user;
                if (username) {
                    auth = await Auth.findOne({
                        username
                    });
                } else if (email) {
                    user = await User.findOne({
                        email
                    });
                    auth = await Auth.findOne({
                        user: user._id
                    });
                } else if (phoneNumber) {
                    user = await User.findOne({
                        phone: phoneNumber
                    });
                    auth = await Auth.findOne({
                        user: user_id
                    });
                }
                // console.log(auth);
                if (!auth) {
                    return done(null, false, {
                        error: true,
                        errorMessage: 'not correct format'
                    });
                } else if (!(password === auth.password)) {
                    return cb(null, false, {
                        message: 'Incorrect email or password.'
                    });
                }
                return done(null, auth.toObject(), {
                    message: 'Sign In Success'
                });
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
