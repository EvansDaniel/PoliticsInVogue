const ArticleBootstrap = require('./components/Article/ArticleBootstrap');
const UserBootstrap = require('./components/User/UserBootstrap');

module.exports = function (app) {
    // TODO: iterate through dirs in components and
    // do this automatically rather than having to add
    // it manually
    ArticleBootstrap(app);
    UserBootstrap(app);

    // status code with optional message
    const defaultHTTPErrorHandler = function (err, code, req, res, next, message) {
        if (err.status !== code) {
            return next(err);
        }
        console.log('Error: ', err.status, err);
        res.status(err.status);
        if(typeof(message) === 'string') {
            return res.json({ message: message });
        } else {
            return res.json(message || { message: err.message });
        }
    };

    app.use(function(err, req, res, next){
        if(err.code >= 500) {
            console.log(err.stack);
        } else {
            console.log(err);
        }
        return res.status(err.code).json({ error: err.message });
    });

    /*// TODO: add catchall route here???
    // Not found error handler
    app.use(function (err, req, res, next) {

        return defaultHTTPErrorHandler(err, 404, req,
            res, next, err.message || 'Looks like the resource you tried to access could not be found');
    });

    // Bad request handler
    app.use(function (err, req, res, next) {
        return defaultHTTPErrorHandler(err, 400, req,
            res, next, err.message || 'Bad request')
    });

    // Internal server error handler
    // TODO possibly: Add these to error handler routes file
    app.use(function (err, req, res, next) {
        // log the error, treat it like a 500 internal server error
        // maybe also log the request so you have more debug information
        //log.error(err, req);
        if(err.status !== 500) {
            return next();
        }
        // during development you may want to print the errors to your console
        console.log(err.stack);

        // send back a 500 with a generic message
        res.status(500);
        return res.json({
            message: err.message || 'Oops! There was a problem on our end. Please try again :)'
        });
    });*/
};
