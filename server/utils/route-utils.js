module.exports = (function () {

    return {
        isAuthenticated: function (req, res, next) {
            return next();
            /*if (req.isAuthenticated()) {
                return next();
            }
            return res.json({
                authenticated: false
            });*/
        },
        // TODO: possibly conditionally use debugging helper depending on dev or prod env
        // TODO: might want to set up logging of this info
        debuggingHelper: function (req, res, next, userFunc) {
            console.log('body', req.body);
            console.log('session', req.session);
            console.log('user', req.user);
            return userFunc(req, res, next);
        },
    }

})();