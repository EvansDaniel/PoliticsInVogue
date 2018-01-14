const serviceUtils = require('../../utils/service-utils');
const HttpError = require('http-error');

const ArticleCategoryDataService = function (ArticleCategory) {
    return {

        getAllCategories: function (cb) {
            ArticleCategory.find({}, function (err, categories) {
                cb(err, categories);
            });
        },

        create: function (articleCategoryData, cb) {
            // TODO: create if no category exists with that name
            // TODO: normalize the name to all lowercase before saving if not exists
            // TODO: look up validation stuff for mongoose
            console.log(articleCategoryData);
            const name = articleCategoryData.name;
            ArticleCategory.findOne({name: name}, function (err, articleCategory) {
                if (err) {
                    cb(err, articleCategory);
                }
                // if category does not exist, save and return it
                console.log(articleCategory);
                if (!articleCategory) {
                    console.log('first');
                    const newArticleCategory = new ArticleCategory(articleCategoryData);
                    newArticleCategory.save(cb);
                } else {
                    console.log('second');
                    // return saved category
                    return cb(err, articleCategory)
                }
            });
        },

        // AKA rename
        update: function (articleCategoryData, cb) {
            // TODO: look into making this check in schema with unique: true for name field
            // Check if articleCategory with given title already exists
            ArticleCategory.count({_id: {$ne: articleCategoryData._id}, name: articleCategoryData.name},
                function (err, numCategories) {
                    if (err) {
                        return cb(err, null);
                    }
                    if (numCategories > 0) {
                        return cb(new HttpError.BadRequest('The category "' +
                                articleCategoryData.name + '" already exists. Choose a different name'),
                            null);
                    } else {
                        // Update the category since category w/ given name doesn't exist
                        // TODO: check if _id is present
                        ArticleCategory.update({_id: articleCategoryData._id}, articleCategoryData,
                            function (err, raw) {
                                console.log('Mongo raw', raw);
                                return cb(err, raw);
                            });
                    }
                });
        }
    }
};

module.exports = ArticleCategoryDataService;

