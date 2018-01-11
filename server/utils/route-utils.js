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

        handle404Error: function (next, message) {
            let err = new Error(message || '');
            err.status = 404;
            return next(err);
        },

        handle500Error: function (err, next) {
            err.status = 500;
            return next(err);
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