const serviceUtils = require('../../utils/service-utils');
const Mongoose = require('mongoose');
const cheerio = require('cheerio');
const constants = require('../../../src/shared/constants');
const editorUtils = require('../../../src/shared/utils/editor-utils');

const ArticleDataService = function (Article) {
        // converts jsonEditorState (stored state of article.body) to excerpt from html body
        const parseText = function (articleBody) {
            const articleBodyHtml = editorUtils.jsonToHTML(articleBody),
                $ = cheerio.load(articleBodyHtml),
                bodyToPlainText = $(constants.ALL_TEXT_TAGS)
                    .text()
                    // make sure there are spaces after periods
                    .replace(/[.]\s*/g, ". ");
            const bodyWords = bodyToPlainText.split(" "),
                maxExcerptLen = 100;
            let excerpt = '';

            bodyWords.forEach(function (word, i) {
                // always add first word, else check if we are less than length limit
                if (i === 0 || excerpt.length + word.length < maxExcerptLen) {
                    excerpt += ' ' + word
                }
            });
            return excerpt;
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

                const excerpt = parseText(article.body);

                return Object.assign(article.toObject && article.toObject() || article, {
                    excerpt: excerpt.trim(),
                    timeToReadInMin: Article.timeToReadInMin(editorUtils.jsonToHTML(article.body)),
                    year: year,
                    month: month
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
            else if (queryObj.hasOwnProperty('categorySlug')) {
                filter.categorySlug = queryObj.categorySlug;
                findFunc = Article.find.bind(Article);
            }
            else if (queryObj.hasOwnProperty('articleSlug')) {
                filter.articleSlug = queryObj.articleSlug;
                findFunc = Article.findOne.bind(Article);
            }

            findFunc(filter, function (err, article) {
                article = _postFindArticleModification(article);
                // if we are requesting a specific article (via articleSlug/_id
                // and user requested suggested articles
                if ((queryObj.hasOwnProperty('_id') || queryObj.hasOwnProperty('articleSlug'))
                    && queryObj.suggestedArticles && article) {
                    getSuggestedArticles({
                        category: article.category,
                        exclude: article._id
                    }, 5, function (err, suggestedArticles) {
                        return cb(err, {
                            suggestedArticles: suggestedArticles,
                            article: article
                        });
                    });
                } else {
                    return cb(err, article);
                }
            });
        };

        const getSuggestedArticles = function (queryObj, max, cb) {
            if (!queryObj.hasOwnProperty('category') || max === 0) {
                return cb && cb(null, []);
            }
            if (!cb) {
                return null;
            }
            const category = queryObj.category;
            const exclude = queryObj.exclude &&
                [new Mongoose.Types.ObjectId(queryObj.exclude)] ||
                [];
            const amount = max % 2 === 0 ? max / 2 : Math.floor(max / 2) + 1;
            let articles = [];

            Article
                .aggregate([
                    {
                        $match: {
                            _id: {$nin: exclude},
                            category: category,
                            draft: false,
                            hidden: false
                        }
                    },
                ])
                .sample(amount)
                .cursor({})
                .exec()
                .on('data', doc => {
                    articles.push(doc);
                })
                .on('end', () => {
                    // find 2 more articles that aren't in given category
                    // and that aren't the article to be excluded
                    Article.find({
                        _id: {
                            $nin: articles.map((article) =>
                                Mongoose.Types.ObjectId(article._id))
                                .concat(exclude),
                        },
                        category: {
                            $nin: [category]
                        },
                        draft: false,
                        hidden: false,
                    }).exec(function (err, arts) {
                        if (err || !arts) {
                            return cb(err, arts);
                        }
                        const twoArts = arts.slice(0, max - articles.length);

                        twoArts.forEach(function (article) {
                            articles.push(article);
                        });

                        return cb(err, _postFindArticleModification(articles));
                    });
                });
        };

        return {
            getArticle: getArticle,

            getSuggestedArticles: getSuggestedArticles,

            // Will be used on Dashboard page
            /**
             * Returns cb with argument for articles as
             * {
         * drafts: [{},...{}], this key only if there is drafts
         * hidden: [{},...{}], this key only if there is hidden
         * categories: [{},...{}] this key only if there are some articles in a category
         * returns {} when no articles
             * @param cb
             */
            getDraftsAndCategories: function (cb) {
                Article.find({}, function (err, articles) {
                    if (err) {
                        return (cb(err));
                    }
                    if (!articles) {
                        return cb(err, articles);
                    }
                    const articlesByCategory = {};
                    const returnedArticles = {};
                    articles.forEach(function (article) {
                        if (!article.draft && !article.hidden) {
                            const cat = article.category;
                            // Check if we've already created array for this category
                            if (!articlesByCategory.hasOwnProperty(cat)) {
                                articlesByCategory[cat] = [];
                            }
                            articlesByCategory[cat].push(_postFindArticleModification(article));
                            // when article is published it is assumed to be non-hidden
                        } else if (article.draft) {
                            if (!returnedArticles.hasOwnProperty('drafts')) {
                                returnedArticles['drafts'] = []
                            }
                            returnedArticles['drafts'].push(_postFindArticleModification(article));
                            // after published and then hidden
                        } else if (article.hidden) {
                            if (!returnedArticles.hasOwnProperty('hidden')) {
                                returnedArticles['hidden'] = []
                            }
                            returnedArticles['hidden'].push(_postFindArticleModification(article));
                        }
                    });
                    returnedArticles['categories'] = articlesByCategory;

                    return cb(err, returnedArticles);
                });
            },

            getAllCategories: function (cb) {
                Article.find({
                    category: {$exists: true},
                    draft: false,
                    hidden: false,
                }, function (err, articles) {
                    if (err) {
                        return cb(err, articles);
                    }
                    if (articles) {
                        const categories = articles.reduce(function (accumulator, article) {
                            accumulator[article.categorySlug] = {
                                category: article.category,
                                categorySlug: article.categorySlug,
                            };
                            return accumulator;
                        }, {});

                        return cb(err, Object.values(categories));
                    }

                    // No categories
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
                Article.find({
                    placement: {$ne: 'none'},
                    draft: false,
                    hidden: false,
                }, function (err, articles) {
                    if (err) {
                        return cb(err, null);
                    }

                    let placedArticles = {};
                    // get all possible placements for home page
                    const placementVals = Article.schema.path('placement').enumValues;

                    // add empty array for each placement value that isn't none
                    placementVals.forEach(function (placement) {
                        if (placement !== 'none') {
                            placedArticles[placement] = []
                        }
                    });

                    // add each article to its respective placement
                    articles.forEach(function (article) {
                        const modifiedArticle = _postFindArticleModification(article);
                        // remove body because it is not needed for a minimum article
                        //delete modifiedArticle.body;
                        placedArticles[article.placement].push(modifiedArticle);
                    });

                    return cb(false, placedArticles);
                });
            },

            create: function (articleData, cb) {
                const newArticle = new Article(articleData);
                // Create new Article slug from title
                newArticle.save(function (err, savedArticle, rowsAffected) {
                    return cb(err, savedArticle, rowsAffected);
                });
            },

            update: function (articleData, cb) {
                // TODO: check if _id is present
                // updating to placed article
                if (articleData.placement !== 'none') {
                    articleData.hidden = false;
                    articleData.draft = false; // ??
                }
                const updateFunc = function (articleData) {
                    Article.update({_id: articleData._id}, articleData,
                        function (err, raw) {
                            console.log('Mongo raw from update', raw);
                            return cb(err, articleData, raw);
                        });
                };

                // if a category is provided, normalize it
                if(articleData.category) {
                    articleData.categorySlug = Article.defaultSlug(articleData.category);
                }

                if (articleData.title) {
                    Article.getArticleSlug(function (slug) {
                        articleData.articleSlug = slug;
                        updateFunc(articleData);
                    }, articleData, Article);
                } else {
                    updateFunc(articleData);
                }
            },

            delete: function (id, cb) {
                return false;
            },

            _postFindArticleModification: _postFindArticleModification,
        }
    }
;

module.exports = ArticleDataService;

