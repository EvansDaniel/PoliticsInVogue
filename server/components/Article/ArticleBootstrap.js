// TODO: figure out a better way to do this
const API_URLS = require('../../../src/shared/api-urls');
const routeUtils = require('../../utils/route-utils');

const ArticleBootstrap = function (app) {
    const Article = require('./Article');
    const ArticleDataService = require('./ArticleDataService')(Article);
    const ArticleRoutes = require('./ArticleRoutes')(ArticleDataService);

    app.get(API_URLS.articleApi,
        ArticleRoutes.getArticleHandle
    );

    app.get(API_URLS.createArticleApi,
        routeUtils.isAuthenticated,
        ArticleRoutes.getCreateArticleHandle
    );

    app.post(API_URLS.createArticleApi,
        routeUtils.isAuthenticated,
        ArticleRoutes.postCreateArticleHandle
    );
};

module.exports = ArticleBootstrap;

