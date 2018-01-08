const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User');

const PassportConfig = function() {
    console.log('Passport config');
    passport.use(new LocalStrategy({
            usernameField: 'email',
        },
        function (email, password, done) {
            //return done(null, {'username': 'username'});
            console.log(email);
            User.findOne({email: email}, function (err, user) {
                // TODO: what happens on err?
                if (err) {
                    console.log('here1');
                    return done(err);
                }
                if (!user) {
                    console.log('here2');
                    return done(null, false, {message: 'Incorrect email.'});
                }
                user.comparePassword(password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        console.log('matching pass');
                        return done(null, user);
                    } else {
                        console.log('unmatching pass');
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                });
            });
        })
    );

    passport.serializeUser(User.serializeUser);

    passport.deserializeUser(User.deserializeUser);
};

module.exports = PassportConfig;