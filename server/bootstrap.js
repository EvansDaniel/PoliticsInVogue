const ArticleBootstrap = require('./components/Article/ArticleBootstrap');
const UserBootstrap = require('./components/User/UserBootstrap');
const ArticleCategoryBootstrap = require('./components/ArticleCategory/ArticleCategoryBootstrap');

module.exports = function (app) {
    // TODO: iterate through dirs in components and
    // do this automatically rather than having to add
    // it manually
    ArticleBootstrap(app);
    UserBootstrap(app);
    ArticleCategoryBootstrap(app);

    // TODO: do I need a catch all route here?
    // Error handler
    app.use(function(err, req, res, next){
        if(err.code >= 500) {
            console.log(err.stack);
        } else {
            console.log(err);
        }
        return res.status(err.code).json({ error: err.message });
    });
};
