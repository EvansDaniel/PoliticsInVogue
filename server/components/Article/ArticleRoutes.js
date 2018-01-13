const routeUtils = require('../../utils/route-utils');

const ArticleRoutes = function (ArticleDataService) {

    const getArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            ArticleDataService.getArticleByTitleAndDate(req.query, function (err, article) {
                // Check for errors, send default response for errors
                if (err) {
                    return next(err);
                }
                if (!article) {
                    // TODO: what to do in this case?
                    console.log(article);
                }
                const createdAt = new Date(article.createdAt),
                    articleObj = article.toObject(),
                    year = createdAt.getFullYear(),
                    month = createdAt.getMonth() + 1;

                articleObj.articleSlug = `/${year}/${month}/${articleObj.slugTitle}`;

                return res.json(articleObj);
            });

        });
    };

    const getPlacementArticleHandle = function (req, res, next) {
        ArticleDataService.getPlacedArticles(function (err, articles) {
            if (err) {
                return next(err);
            }
            if (!articles) {
                console.log(articles);
            }
            return res.json(articles);
        });
    };

    const getCreateArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            ArticleDataService.getArticleById()
        });
    };

    const getEditArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {

        });
    };

    const postCreateArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            // TODO: remember to use Content-Type application/json
            ArticleDataService.create(req.body.data, function (err, savedArticle, rowsAffected) {
                if (err) {
                    next(err);
                }
                if (!savedArticle) {
                    console.log(savedArticle);
                }
                return res.json(savedArticle);
            });
        });
    };

    return {
        getArticleHandle: getArticleHandle,
        getCreateArticleHandle: getCreateArticleHandle,
        postCreateArticleHandle: postCreateArticleHandle,
        getPlacementArticleHandle: getPlacementArticleHandle
    };
};

module.exports = ArticleRoutes;

