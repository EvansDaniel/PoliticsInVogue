// TODO: figure out a better way to do this
const URLS = require('../../../src/shared/urls');
const routeUtils = require('../../utils/route-utils');

const ArticleBootstrap = function (app) {
    const Article = require('./Article');
    const ArticleDataService = require('./ArticleDataService')(Article);
    const ArticleRoutes = require('./ArticleRoutes')(ArticleDataService);

    app.get(URLS.API.article,
        ArticleRoutes.getArticleHandle
    );

    app.get(URLS.API.articles,
        ArticleRoutes.getArticlesHandle
    );

    app.get(URLS.API.createArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.getCreateArticleHandle
    );

    app.get(URLS.API.editArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.getEditArticleHandle
    );

    app.post(URLS.API.editArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.postEditArticleHandle
    );

    app.post(URLS.API.createArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.postCreateArticleHandle
    );

    app.get(URLS.API.articlePlacement,
        ArticleRoutes.getPlacementArticleHandle
    );
};

module.exports = ArticleBootstrap;

