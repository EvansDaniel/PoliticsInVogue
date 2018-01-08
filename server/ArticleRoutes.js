const API_URLS = require('../src/shared/api-urls');

const ArticleRoutes = function (app, ArticleDataService) {

    const isAuthenticated = function (req, res, next) {
        return next();
        /*if (req.isAuthenticated()) return next();
         return res.json({
         authenticated: false
         })*/
    };

    const createArticlePostHandle = function
        (ArticleDataService) {
        return function (req, res, next) {
            // TODO: remember to use Content-Type application/json
            ArticleDataService.create(req.body.data, function (err) {
                if(err) {
                    return res.json({
                        status: false
                    });
                } else {
                    return res.json({
                        status: true
                    });
                }
            });
        }
    };

    app.post(API_URLS.createArticleApi,
        createArticlePostHandle(ArticleDataService));

    return {
        routeHandles: {
            createArticleHandle: createArticlePostHandle
        }
    };
};

module.exports = ArticleRoutes;