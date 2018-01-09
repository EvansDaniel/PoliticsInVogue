// TODO: figure out a better way to do this
const API_URLS = require('../../../src/shared/api-urls');
const routeUtils = require('../../utils/route-utils');

const ArticleCategoryBootstrap = function (app) {
    const ArticleCategory = require('./ArticleCategory');
    const ArticleCategoryDataService = require('./ArticleCategoryDataService')(ArticleCategory);
    const ArticleCategoryRoutes = require('./ArticleCategoryRoutes')(ArticleCategoryDataService);

    // define app.get/post routes here
};

module.exports = ArticleCategoryBootstrap;

