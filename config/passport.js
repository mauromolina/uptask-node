const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: email
                    }
                })
                if(!user.verifyPassword(password)){
                    return done(null, false, {
                        message: 'Contraseña incorrecta'
                    })
                }
                return done(null, user);
            } catch (error) {
                return done(null, false, {
                    message: 'El usuario no existe'
                })
            }
        }
    )
);

passport.serializeUser( (user, callback) => {
    callback(null, user);
})

passport.deserializeUser( (user, callback) => {
    callback(null, user);
})

module.exports = passport;