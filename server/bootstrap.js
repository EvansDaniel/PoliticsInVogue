const mongoose = require('mongoose');

const ArticleBootstrap = require('./components/Article/ArticleBootstrap');
const UserBootstrap = require('./components/User/UserBootstrap');

module.exports = function (app) {
    // TODO: iterate through dirs in components and
    // do this automatically rather than having to add
    // it manually
    ArticleBootstrap(app);
    UserBootstrap(app);

    // TODO: do I need a catch all route here?
    // Error handler
    app.use(function(err, req, res, next){
        console.log('error handler', JSON.stringify(err, null, 2));
        if(err instanceof mongoose.Error.ValidationError) {
            const messages = [];
            for(let field in err.errors) {
                if(err.errors.hasOwnProperty(field)) {
                    messages.push(err.errors[field].message);
                }
            }
            return res.status(400).json({
                messages: messages,
                error: err
            });
        }

        return res.status((err.code >= 100 && err.code)
            || 500).json({ error: err });
    });
};
