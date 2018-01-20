const routeUtils = require('../../utils/route-utils');
const constants = require('../../../src/shared/constants');
const uuidv4 = require('uuid/v4');

const UserRoutes = function (UserDataService) {

    const postLogin = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            if (req.cookies.hasOwnProperty(constants.CACHED_AUTH_COOKIE)) {
                console.log('Cached auth cookie saved');
            } else {
                console.log('Not saved, building');
                res.cookie(constants.CACHED_AUTH_COOKIE,
                    uuidv4(), {
                        maxAge: constants.SESSION_COOKIE_TIME
                    });
            }

            res.json(req.user);
        });
    };

    const getCheckAuthenticated = function (req, res, next) {
        return res.json({
            authenticated: req.isAuthenticated && req.isAuthenticated()
        });
    };

    return {
        postLogin: postLogin,
        getCheckAuthenticated: getCheckAuthenticated
    };
};

module.exports = UserRoutes;

