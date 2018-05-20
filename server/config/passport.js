const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
const PassportConfig = function(User) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
        },
        function (email, password, done) {
            console.log('here1');
            User.findOne({email: email}, function (err, user) {
                console.log('here2');
                // TODO: what happens on err?
                if (err) {
                    console.log('error finding user and authenticating');
                    return done(err);
                }
                if (!user) {
                    console.log('user not found');
                    return done(null, false, {message: 'Incorrect email or password'});
                }
                console.log('here3')
                user.comparePassword(password, function (err, isMatch) {
                    console.log('here5');
                    if (err) throw err;
                    if (isMatch) {
                        console.log('here6');
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect email or password'});
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
    passport.deserializeUser(function (userFromSession, done) {
        User.findById(userFromSession._id)
            .then((user) => {
                // TODO: remove password from user object
                user = user.toObject();
                delete user.password;
                done(null, user);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    });
};

module.exports = PassportConfig;