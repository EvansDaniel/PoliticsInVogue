const HttpError = require('http-error');

module.exports = (function () {
    return {
        isAuthenticated: function (req, res, next) {
            console.log('CHECKING AUTH');
            if (req.isAuthenticated()) {
                console.log('i am authenticated :)');
                return next();
            }
            return next(new HttpError.Unauthorized('You are not authorized to see this page. You are probably not signed in.'));
        },

        // TODO: possibly conditionally use debugging helper depending on dev or prod env
        // TODO: might want to set up logging of this info
        debuggingHelper: function (req, res, next, userFunc) {
            //console.log('body', JSON.stringify(req.body, null, 2));
            //console.log('query params', JSON.stringify(req.query, null, 2));
            //console.log('session', JSON.stringify(req.session, null, 2));
            //console.log('user', JSON.stringify(req.user, null, 2));
            return userFunc(req, res, next);
        },
    }
})();