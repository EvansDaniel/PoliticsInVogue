const routeUtils = require('../../utils/route-utils');

const UserRoutes = function (UserDataService) {

    const postLogin = function (req, res, next) {
        routeUtils.debuggingHelper(req,res,next, function (req,res,next) {
            delete req.user.password;
            res.json(req.user);
        });
    };

    return {
        postLogin: postLogin
    };
};

module.exports = UserRoutes;

