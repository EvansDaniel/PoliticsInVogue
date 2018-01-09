const serviceUtils = require('../../utils/service-utils');

const ArticleDataService = function (Article) {
    // TODO: find a good place to put this
    const errorLogger = function (err, cb) {
        if(err) console.log(err);
        return cb(err);
    };
    return {
        create: function (articleData, cb) {
            // Article data contains title, author, body
            // hidden, draft, trashed
            // TODO: look up validation stuff for mongoose
            // https://thecodebarbarian.wordpress.com/2013/05/12/how-to-easily-validate-any-form-ever-using-angularjs/
            const newArticle = new Article(articleData);
            console.log(articleData);
            newArticle.save(function (err) {
                errorLogger(err,cb);
            });
        },

        update: function (articleData, cb) {
            // TODO: check if _id is present
            // Model.update(conditions, doc, [options], [callback])
            Article.update({ _id: articleData._id }, articleData,
                function (err, raw) {
                    console.log('Mongo raw', raw);
                    errorLogger(err, cb);
                });
        },

        delete: function (id) {
            return false;
        },

        findByName: function (normalizedName) {
            return false;
        }
    }

};

module.exports = ArticleDataService;

