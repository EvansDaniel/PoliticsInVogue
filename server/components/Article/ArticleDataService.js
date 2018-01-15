const serviceUtils = require('../../utils/service-utils');

const ArticleDataService = function (Article) {
    const minimumArticleFields = ['_id', 'title', 'createdAt', 'updatedAt',
        'placement', 'excerpt', 'articleSlug'];

    // article is a plain object with all data attributes
    const buildMinimumArticle = function (article) {
        const minArticle = {};
        for (let field in article) {
            if (article.hasOwnProperty(field) && (minimumArticleFields.indexOf(field) > -1)) {
                minArticle[field] = article[field];
            }
        }
        return minArticle;
    };

    const postFindArticleModification = function (articles) {
        if (!articles) {
            return articles;
        }
        const modifyArticle = function (article) {
            const articleObj = article.toObject(),
                slugTitle = articleObj.title
                // replace all non-alphanumeric characters
                // that isn't space
                    .replace(/[^a-zA-Z\d\s:]/g, '')
                    // replace space with "-"
                    .replace(new RegExp(" ", 'g'), '-')
                    .toLowerCase();
            const createdAt = new Date(articleObj.createdAt),
                year = createdAt.getFullYear(),
                month = createdAt.getMonth() + 1;

            articleObj.articleSlug = `/${year}/${month}/${slugTitle}`;

            const bodyWords = articleObj.body.split(" "),
                maxExcerptLen = 100;
            let excerpt = '';

            bodyWords.forEach(function (word, i) {
                // always add first word, else check if we are less than length limit
                if (i === 0 || excerpt.length + word.length < maxExcerptLen) {
                    excerpt += ' ' + word
                }
            });

            articleObj.excerpt = excerpt.trim();
            return articleObj;
        };
        // check for array of articles and handle properly
        return articles instanceof Array ? articles.map(modifyArticle) : modifyArticle(articles);
    };

    return {
        getArticle: function (queryObj, cb) {
            let filter = {},
                findFunc = Article.find.bind(Article);
            if(queryObj.hasOwnProperty('id')) {
                filter._id = queryObj.id;
                findFunc = Article.findOne.bind(Article);
            } else if(queryObj.hasOwnProperty('category')) {
                filter.category = queryObj.category;
                findFunc = Article.find.bind(Article);
            }

            findFunc(filter)
                .exec(function (err, article) {
                    // Don't think postFindArticleModification is needed here??
                    return cb(err, postFindArticleModification(article));
                });
        },

        getAllCategories: function (cb) {
            Article.find({category: 'Uncategorized'})
        },

        /*
         Articles returned of form: {
         placement1: [ list of articles w/ placement 1],
         placement2: [ list of articles w/ placement 2]
         }
         */
        getPlacedArticles: function (cb) {
            // TODO: What if I change 'none' to something else?
            Article.find({placement: {$ne: 'none'}}, function (err, articles) {
                if (err) {
                    return cb(err, null);
                }

                let placedArticles = {};
                const placementVals = Article.schema.path('placement').enumValues;

                // add empty array for each placement value that isn't none
                placementVals.forEach(function (placement) {
                    if (placement !== 'none') {
                        placedArticles[placement] = []
                    }
                });

                // add each article to its respective placement
                articles.forEach(function (article) {
                    const modifiedArticle = buildMinimumArticle(postFindArticleModification(article));
                    // remove body because it is not needed for a minimum article
                    //delete modifiedArticle.body;
                    placedArticles[article.placement].push(modifiedArticle);
                });

                return cb(false, placedArticles);
            });
        },

        create: function (articleData, cb) {
            // Article data contains title, author, body
            // hidden, draft, trashed
            // TODO: look up validation stuff for mongoose
            // Replace the category data with its id
            const newArticle = new Article(articleData);
            newArticle.save(function (err, savedArticle, rowsAffected) {
                return cb(err, savedArticle, rowsAffected);
            });
        },

        update: function (articleData, cb) {
            // TODO: check if _id is present
            // If we are updating as hidden article, we want to unplace it as well
            if (articleData.hidden) {
                articleData.placement = 'none';
            }
            Article.update({_id: articleData._id}, articleData,
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

