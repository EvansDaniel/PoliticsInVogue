const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
const PassportConfig = function(User) {
    console.log('Passport config');
    passport.use(new LocalStrategy({
            usernameField: 'email',
        },
        function (email, password, done) {
            console.log(email, password);

            User.findOne({email: email}, function (err, user) {
                // TODO: what happens on err?
                if (err) {
                    console.log('error finding user and authenticating');
                    return done(err);
                }
                if (!user) {
                    console.log('user not found');
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

    // Called when user logs in
    passport.serializeUser(function (user, done) {
        done(null, {
            _id: user._id
        });
    });

    // Called on subsequent requests after logging in
    passport.deserializeUser(function (user, done) {
        User.findById(user._id)
            .then((user) => {
                // TODO: remove password from user object
                done(null, user);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    });
};

module.exports = PassportConfig;