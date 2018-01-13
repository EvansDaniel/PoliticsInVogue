const serviceUtils = require('../../utils/service-utils');

const ArticleDataService = function (Article) {
    return {
        getArticleById: function (id, cb) {
            Article.findOne({
                    _id: id
                }, cb);
        },

        /*
        Articles returned of form: {
            placement1: [ list of articles w/ placement 1],
            placement2: [ list of articles w/ placement 2]
        }
         */
        getPlacedArticles: function (cb) {
            // TODO: What if I change 'none' to something else?
            Article.find({placement: {$ne : 'none'}}, function (err, articles) {
                if(err) {
                    return cb(err, null);
                }
                let placedArticles = {};
                articles.forEach(function (article) {
                    placedArticles[article.placement] = article
                });
                return cb(null, placedArticles);
            });
        },

        getArticleByTitleAndDate: function (queryObj, cb) {
            const err  = serviceUtils.checkRequiredQueryParams(queryObj, {
                slugTitle: 'Normalized article title returned in Article model',
                createdAt: 'ISO date of article publishing'
            });
            if(err) {
                return cb(err, null);
            }
            // TODO: date must be iso formatted, etc.
            Article.findOne({
                slugTitle: queryObj.slugTitle,
                createdAt: new Date(queryObj.createdAt)
            }, cb);
        },

        getArticlesByCategory: function (category, cb) {

        },

        getArticles: function (cb) {

        },

        create: function (articleData, cb) {
            // Article data contains title, author, body
            // hidden, draft, trashed
            // TODO: look up validation stuff for mongoose
            // https://thecodebarbarian.wordpress.com/2013/05/12/how-to-easily-validate-any-form-ever-using-angularjs/
            const newArticle = new Article(articleData);
            newArticle.addNormalizedTitle(articleData.title);
            newArticle.save(function (err, savedArticle, rowsAffected) {
                return cb(err, savedArticle, rowsAffected);
            });
        },

        update: function (articleData, cb) {
            // TODO: check if _id is present
            // Model.update(conditions, doc, [options], [callback])
            Article.update({ _id: articleData._id }, articleData,
                function (err, raw) {
                    console.log('Mongo raw from update', raw);
                    return cb(err, raw);
                });
        },

        delete: function (id, cb) {
            return false;
        },
    }
};

module.exports = ArticleDataService;

