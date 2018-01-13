const serviceUtils = require('../../utils/service-utils');

const ArticleCategoryDataService = function (ArticleCategory) {
    return {

        getAllCategories: function (cb) {
            ArticleCategory.find({}, function (err, categories) {
                cb(err, categories);
            });
        },

        create: function (articlecategoryData, cb) {
            // TODO: look up validation stuff for mongoose
            const newArticleCategory = new ArticleCategory(articlecategoryData);
            console.log(articlecategoryData);
            newArticleCategory.save(cb);
        },

        update: function (articlecategoryData, cb) {
            // TODO: check if _id is present
            ArticleCategory.update({ _id: articlecategoryData._id }, articlecategoryData,
                function (err, raw) {
                console.log('Mongo raw', raw);
                return cb(err, raw);
            });
        },

        delete: function (id, cb) {
            return false;
        },
    }
};

module.exports = ArticleCategoryDataService;

