// TODO: figure out a better way to do this

const ArticleBootstrap = function (app) {
    const Article = require('./models/Article');
    const ArticleDataService = require('./services/ArticleDataService')(Article);
    const ArticleRoutes = require('./ArticleRoutes');

    ArticleRoutes(app, ArticleDataService);
};

module.exports = ArticleBootstrap;