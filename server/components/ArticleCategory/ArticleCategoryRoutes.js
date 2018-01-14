const routeUtils = require('../../utils/route-utils');

const ArticleCategoryRoutes = function (ArticleCategoryDataService) {

    // route handles go here
    const getCategoriesHandle = function (req, res, next) {
        ArticleCategoryDataService.getAllCategories(function (err, categories) {
            if(err) {
                return next(err); // ??
            }
            if(!categories) {
                // DO what???
            }
            return res.json(categories);
        })
    };

    const postEditCategoryHandle = function (req, res, next) {
        ArticleCategoryDataService.update(req.body.data, function (err, raw) {
           if(err) {
               return next(err);
           }
           return res.json({});
        });
    };

    return {
        getCategoriesHandle: getCategoriesHandle,
        postEditCategoryHandle: postEditCategoryHandle
    };
};

module.exports = ArticleCategoryRoutes;

