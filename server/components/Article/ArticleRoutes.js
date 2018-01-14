const routeUtils = require('../../utils/route-utils');
const HttpError = require('http-error');

const ArticleRoutes = function (ArticleDataService) {

    const getArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            ArticleDataService.getArticleById(req.query.id,function (err, article) {
                // Check for errors, send default response for errors
                if (err) {
                    return next(err);
                }

                if (!article) {
                    // TODO: what to do in this case?
                    console.log(article);
                }

                return res.json(article);
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
            ArticleDataService.getArticleById(req.query.id, function (err, article) {
                if(err) {
                    return next(err);
                }
                if(!article) {
                    // TODO: make sure this works
                    return next(new HttpError.NotFound('The requested resource was not found'))
                }
                return res.json(article);
            })
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

    const postEditArticleHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            ArticleDataService.update(req.body.data, function (err, raw) {
                if(err) {
                    return next(err);
                }
                // TODO: should I explicitly send status of OK or something?
                return res.json({});
            });
        });
    };

    const getArticlesHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            ArticleDataService.getArticlesByCategory(req.query.category, function (err, articles) {
                if(err) {
                    return next(err);
                }
                // TODO: should I explicitly send status of OK or something?
                return res.json(articles);
            });
        });
    };

    return {
        getArticleHandle: getArticleHandle,
        getArticlesHandle: getArticlesHandle,
        getCreateArticleHandle: getCreateArticleHandle,
        getEditArticleHandle: getEditArticleHandle,
        getPlacementArticleHandle: getPlacementArticleHandle,
        postEditArticleHandle: postEditArticleHandle,
        postCreateArticleHandle: postCreateArticleHandle,
    };
};

module.exports = ArticleRoutes;

