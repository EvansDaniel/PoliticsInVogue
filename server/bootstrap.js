const ArticleBootstrap = require('./components/Article/ArticleBootstrap');
const UserBootstrap = require('./components/User/UserBootstrap');

module.exports = function (app) {
    // TODO: iterate through dirs in components and
    // do this automatically rather than having to add
    // it manually
    ArticleBootstrap(app);
    UserBootstrap(app);
};
