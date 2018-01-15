const routeUtils = require('../../utils/route-utils');

const UserRoutes = function (UserDataService) {

    const postLogin = function (req, res, next) {
        routeUtils.debuggingHelper(req,res,next, function (req,res,next) {
            delete req.user.password;
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

