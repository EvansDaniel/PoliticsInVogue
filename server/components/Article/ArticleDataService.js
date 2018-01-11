const serviceUtils = require('../../utils/service-utils');

const ArticleDataService = function (Article) {
    return {
        getArticleById: function (id, cb) {
            Article.findOne({
                    _id: id
                }, function (err, article) {
                return cb(err, article);
            });
        },

        getPlacedArticles: function (placement, cb) {
            if(Article.schema.path('placement')
                    .enumValues.indexOf(placement) <= -1) {
                // No err, indicate no data returned
                return cb(false, false)
            }
            console.log(placement);
            Article.find({placement: placement}, function (err, articles) {
                return cb(err, articles);
            });
        },

        getArticleByTitleAndDate: function (obj, cb) {
            // obj should have "createdAt"
            // and "normalizedTitle"
            Article.findOne({
                normalizedTitle: obj.normalizedTitle,
                createdAt: new Date(obj.createdAt)
            }, function (err, article) {
                return cb(err, article);
            });
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
            newArticle.save(function (err) {
                serviceUtils.errorLogger(err,cb);
            });
        },

        update: function (articleData, cb) {
            // TODO: check if _id is present
            // Model.update(conditions, doc, [options], [callback])
            Article.update({ _id: articleData._id }, articleData,
                function (err, raw) {
                    console.log('Mongo raw', raw);
                    serviceUtils.errorLogger(err, cb);
                });
        },

        delete: function (id, cb) {
            return false;
        },
    }
};

module.exports = ArticleDataService;

