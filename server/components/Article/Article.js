const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Article title is required'],
        trim: true,
    },
    author: {
        type: String,
        default: 'Sophie Clark',
        trim: true
    },
    category: {
        type: String,
        required: [function () {
            return !this.draft;
        }, 'You must provide a category prior to publishing the article'],
    },
    articleSlug: {
        type: String,
    },
    showcaseImage: {
        // TODO: write an image url validator
        type: String,
        require: [function () {
            return !this.draft
        }, 'You must provide a main image prior to publishing the article']
    },
    body: {
        type: String,
        default: '',
        trim: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    draft: {
        type: Boolean,
        default: true
    },
    placement: {
        type: String,
        default: 'none',
        enum: ['none', 'featured', 'carousel'],
    },
    // Are these something that we want??
    // TODO: Check some analytics libs for this functionality
    meta: {
        upvotes: Number,
        downvotes: Number,
        shareClicks: Number
    }
}, {
    timestamps: true
});

ArticleSchema.statics.timeToReadInMin = function (text) {
    const averageWordsPerMin = 250;
    const numWordsInArticle = text.split(' ').length;
    return Math.ceil(numWordsInArticle / averageWordsPerMin)
        || 1;
};


(function setUpUniqueArticleSlug(ArticleSchema) {
    const defaultSlug = function (title) {
        return title
        // replace all non-alphanumeric characters
        // that isn't space
            .replace(/[^a-zA-Z\d\s:]/g, '')
            // replace space with "-"
            .replace(new RegExp(" ", 'g'), '-')
            .toLowerCase();
    };

    const getArticleSlug = function (cb, title, Article) {
        Article.find({}, function (err, articles) {
            const defaultSlug = Article.defaultSlug(title);
            let maxAtLeast = false;
            if (!articles) {
                return cb(defaultSlug);
            } else {
                const articleSlugEndings = articles.reduce((result, article) => {
                    const slug = article.articleSlug;
                    if (slug && slug.startsWith(defaultSlug)) {
                        maxAtLeast = 1;
                        // Get all chars after defaultSlug
                        try {
                            // This still guarantees uniqueness if somehow we don't have an integer at the end of the slug
                            // title because we will be appending an integer
                            const afterChars = slug.substring(
                                slug.indexOf(defaultSlug) + defaultSlug.length, slug.length);
                            if (afterChars) {
                                result.push(parseInt(afterChars));
                            }
                        } catch (e) {
                            console.log('Error while parsing int', e);
                        }
                    }
                    return result
                }, []);
                // We found articles with the same articleSlug prefix so now we append the max
                // + 1 slug ending
                if (articleSlugEndings.length) {
                    const ending = (Math.max.apply(Math, articleSlugEndings) + 1);
                    return cb(defaultSlug + ending);
                }
                // didn't find an articleSlugs with the same prefix so we are okay to use this one
                // as the prefix
                // maxAtLeast will be truthy if we found a slug that startsWith the given title's slug
                // This was we can add a 1 to it since it isn't actually unique
                return cb(defaultSlug + (maxAtLeast ? 1 : ''))

            }
        });
    };

    ArticleSchema.statics.defaultSlug = function (title) {
        return defaultSlug(title);
    };

    ArticleSchema.methods.getArticleSlug = function(cb) {
        return getArticleSlug(cb, this.title, this.model('Article'));
    };

    ArticleSchema.statics.getArticleSlug = function(cb, title, Article) {
        return getArticleSlug(cb, title, Article);
    };

    ArticleSchema.pre('save', function (next) {
        const article = this;

        if (!article.isModified('title')) return next();

        article.getArticleSlug(function (slug) {
            article.articleSlug = slug;
            return next();
        });
    });
})(ArticleSchema);

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
