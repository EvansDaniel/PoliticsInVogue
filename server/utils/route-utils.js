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
            console.log('body', JSON.stringify(req.body, null, 2));
            console.log('query params', JSON.stringify(req.query, null, 2));
            console.log('session', JSON.stringify(req.session, null, 2));
            console.log('user', JSON.stringify(req.user, null, 2));
            return userFunc(req, res, next);
        },
    }
})();