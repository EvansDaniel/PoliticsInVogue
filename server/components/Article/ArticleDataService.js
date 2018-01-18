const serviceUtils = require('../../utils/service-utils');
const Mongoose = require('mongoose');

const ArticleDataService = function (Article) {
    const minimumArticleFields = ['_id', 'title', 'createdAt', 'updatedAt',
        'placement', 'excerpt', 'articleSlug', 'showcaseImage'];

    // article is a plain object with all data attributes
    const _buildMinimumArticle = function (article) {
        const minArticle = {};
        for (let field in article) {
            if (article.hasOwnProperty(field) && (minimumArticleFields.indexOf(field) > -1)) {
                minArticle[field] = article[field];
            }
        }
        return minArticle;
    };

    const _postFindArticleModification = function (articles) {
        if (!articles) {
            return articles;
        }
        const modifyArticle = function (article) {
            //const articleObj = article instanceof Article ? article.toObject() : article,
            if (!article) {
                return article;
            }
            const slugTitle = article.title
            // replace all non-alphanumeric characters
            // that isn't space
                .replace(/[^a-zA-Z\d\s:]/g, '')
                // replace space with "-"
                .replace(new RegExp(" ", 'g'), '-')
                .toLowerCase();
            const createdAt = new Date(article.createdAt),
                year = createdAt.getFullYear(),
                month = createdAt.getMonth() + 1;

            const bodyWords = article.body.split(" "),
                maxExcerptLen = 100;
            let excerpt = '';

            bodyWords.forEach(function (word, i) {
                // always add first word, else check if we are less than length limit
                if (i === 0 || excerpt.length + word.length < maxExcerptLen) {
                    excerpt += ' ' + word
                }
            });

            return Object.assign(article.toObject && article.toObject() || article, {
                excerpt: excerpt.trim(),
                timeToReadInMin: Article.timeToReadInMin(article.body),
                articleSlug: `/${year}/${month}/${slugTitle}`
            });
        };
        // check for array of articles and handle properly
        return articles instanceof Array ? articles.map(modifyArticle) : modifyArticle(articles);
    };

    const getArticle = function (queryObj, cb) {
        let filter = {},
            findFunc = Article.find.bind(Article);
        if (queryObj.hasOwnProperty('_id')) {
            filter._id = queryObj._id;
            findFunc = Article.findOne.bind(Article);
        } else if (queryObj.hasOwnProperty('category')) {
            filter.category = queryObj.category;
            findFunc = Article.find.bind(Article);
        }

        findFunc(filter, function (err, article) {
            return cb(err, _postFindArticleModification(article));
        });
    };

    return {
        getArticle: getArticle,

        getSuggestedArticles: function (queryObj, cb) {
            const category = queryObj.category;
            console.log(category);
            let articles = [];
            Article
                .aggregate([
                    { $match: { _id: { $nin: queryObj.exclude && [queryObj.exclude] || []} } }
                ])
                .sample(2)
                .cursor({})
                .exec()
                .on('data', doc => {
                    articles.push(doc);
                })
                .on('err', err => {
                    return cb(err, null)
                })
                .on('end', () => {
                    Article.find({
                        _id: {
                            $nin: articles.map((article) =>
                                Mongoose.Types.ObjectId(article._id))
                                .concat(queryObj.exclude && [queryObj.excerpt] || [])
                        }
                    }).limit(2).exec(function (err, arts) {
                        if(err || !arts) {
                            return cb(err, arts);
                        }

                        arts.forEach(function (article) {
                            articles.push(article);
                        });

                        return cb(err, _postFindArticleModification(articles));
                    });
                });
        },

        getAllCategories: function (cb) {
            Article.find({category: {$exists: true}}, function (err, articles) {
                if (err) {
                    return cb(err, articles);
                }
                if (articles) {
                    const categories = articles.reduce(function (accumulator, article) {
                        const cat = article.category;
                        accumulator[cat] = cat;
                        return accumulator;
                    }, {});

                    return cb(err, Object.keys(categories));
                }

                return cb(err, []);
            });
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
                    const modifiedArticle = _buildMinimumArticle(_postFindArticleModification(article));
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

        _postFindArticleModification: _postFindArticleModification,
        _buildMinimumArticle: _buildMinimumArticle
    }
};

module.exports = ArticleDataService;

