const serviceUtils = require('../../utils/service-utils');

const ArticleCategoryDataService = function (ArticleCategory) {
    return {
        create: function (articlecategoryData, cb) {
            // TODO: look up validation stuff for mongoose
            const newArticleCategory = new ArticleCategory(articlecategoryData);
            console.log(articlecategoryData);
            newArticleCategory.save(function (err) {
                serviceUtils.errorLogger(err,cb);
            });
        },

        update: function (articlecategoryData, cb) {
            // TODO: check if _id is present
            ArticleCategory.update({ _id: articlecategoryData._id }, articlecategoryData,
                function (err, raw) {
                console.log('Mongo raw', raw);
                serviceUtils.errorLogger(err, cb);
            });
        },

        delete: function (id, cb) {
            //serviceUtils.errorLogger(err, cb);
            return false;
        },
    }
};

module.exports = ArticleCategoryDataService;

