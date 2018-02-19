const routeUtils = require('../../utils/route-utils');
const constants = require('../../../src/shared/constants');
const cookieUtils = require('../../utils/cookie-utils');
const HttpError = require('http-error');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const UserRoutes = function (UserDataService) {

    const postLogin = function (req, res, next) {
        // we successfully authenticated so cache a cookie and send back user info
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            console.log('Building cached auth cookie');
            res.cookie(constants.CACHED_AUTH_COOKIE,
                uuidv4(), cookieUtils.getCookieOptions({
                    maxAge: constants.SESSION_COOKIE_TIME
                }));
            const user = req.user.toObject();
            delete user.password;
            res.json(user);
        });
    };

    const getCheckAuthenticated = function (req, res, next) {
        return res.json({
            authenticated: !!req.isAuthenticated && req.isAuthenticated()
        });
    };

    const getMeHandle = function (req, res, next) {
        return res.json(req.user);
    };

    const postEditMeHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            UserDataService.update(req.body.data, function (err, raw) {
                if (err) {
                    next(err);
                }
                return res.json({});
            });
        })
    };

    return {
        getMeHandle: getMeHandle,
        postEditMeHandle: postEditMeHandle,
        postLogin: postLogin,
        getCheckAuthenticated: getCheckAuthenticated
    };
};

module.exports = UserRoutes;

