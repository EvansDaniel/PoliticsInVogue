const URLS = require('../../../src/shared/urls'),
    passport = require('passport'),
    PassportConfig = require('../../config/passport');

const signUpIfNotSignedUp = function(User) {
    const email = process.env.AUTHOR_EMAIL,
        pass = process.env.AUTHOR_PASSWORD;
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
        UserRoutes.postLogin
    );

    app.get(URLS.API.checkAuthenticated,
        UserRoutes.getCheckAuthenticated
    );

    app.get(URLS.API.me,
        UserRoutes.getMeHandle
    );

    app.post(URLS.API.editMe,
        UserRoutes.postEditMeHandle
    );
};

module.exports = UserBootstrap;

