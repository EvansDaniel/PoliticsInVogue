const URLS = require('../../../src/shared/urls'),
    passport = require('passport'),
    PassportConfig = require('../../config/passport');
// TODO: figure out a better way to do this

// TODO: remove this and find better solution
const signUpIfNotSignedUp = function(User) {
    const email = 'clarksl0@sewanee.edu',
        pass = 'password';
    const newUser = new User({
        email: email,
        password: pass

    });

    User.findOne({email: email}, function (err, user) {
        // TODO: what happens on err?
        if (err) throw err;
        if (!user) {
            newUser.save(function (err) {
                if (err) throw err;
                // saved!
            });
        }
    });
};

const UserBootstrap = function (app) {
    const User = require('./User');
    const UserDataService = require('./UserDataService')(User);
    const UserRoutes = require('./UserRoutes')(UserDataService);

    signUpIfNotSignedUp(User);
    PassportConfig(User);

    // TODO: remember to use Content-Type application/json
    app.post(URLS.API.login,
        passport.authenticate('local'),
        UserRoutes.postLogin);
};

module.exports = UserBootstrap;

