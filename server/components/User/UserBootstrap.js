const URLS = require('../../../src/shared/urls'),
    passport = require('passport'),
    PassportConfig = require('../../config/passport'),
    routeUtils = require('../../utils/route-utils'),
    constants = require('../../../src/shared/constants');

const signUpIfNotSignedUp = function(User) {
    console.log('in signUpIfNotSignedUp');
    let email = process.env.AUTHOR_EMAIL,
        pass = process.env.AUTHOR_PASSWORD;
    // change to dev email/pass if development
    if(process.env.NODE_ENV === 'development') {
        email = constants.DEV_EMAIL;
        pass = constants.DEV_PASSWORD;
    }

    const newUser = new User({
        email: email,
        password: pass

    });

    console.log('email', email, 'pass', pass);
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
    const UserRoutes = require('./UserRoutes')(UserDataService, User);

    signUpIfNotSignedUp(User);
    PassportConfig(User);

    // TODO: remember to use Content-Type application/json
    app.post(URLS.API.login,
        passport.authenticate('local'),
        UserRoutes.postLogin
    );

    app.post(URLS.API.logout,
        UserRoutes.postLogout
    );

    app.get(URLS.API.checkAuthenticated,
        UserRoutes.getCheckAuthenticated
    );

    app.get(URLS.API.me,
        UserRoutes.getMeHandle
    );

    app.post(URLS.API.editMe,
        routeUtils.isAuthenticated,
        UserRoutes.postEditMeHandle
    );
};

module.exports = UserBootstrap;

