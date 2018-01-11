const ArticleBootstrap = require('./components/Article/ArticleBootstrap');
const UserBootstrap = require('./components/User/UserBootstrap');

module.exports = function (app) {
    // TODO: iterate through dirs in components and
    // do this automatically rather than having to add
    // it manually
    ArticleBootstrap(app);
    UserBootstrap(app);

    // TODO: add catchall route here???

    app.use(function (err, req, res, next) {
        if (err.status !== 404) {
            return next(err);
        }
        console.log(err, req);
        res.status(404);
        return res.json({
            message: err.message || 'Looks like the resource you tried to access could not be found'
        });
    });

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
    });
};
