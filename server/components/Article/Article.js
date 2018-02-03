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

ArticleSchema.pre('save', function (next) {
    const article = this;

    if (!article.isModified('title')) return next();

    article.getArticleSlug(function (slug) {
        article.articleSlug = slug;
        return next();
    });
});

/*ArticleSchema.pre('update', function() {
    this.update({},{ $set: { updatedAt: new Date() } });
});*/


ArticleSchema.statics.timeToReadInMin = function (text) {
    const averageWordsPerMin = 250;
    const numWordsInArticle = text.split(' ').length;
    return Math.ceil(numWordsInArticle / averageWordsPerMin)
        || 1;
};

ArticleSchema.methods.defaultSlug = function () {
    return this.title
    // replace all non-alphanumeric characters
    // that isn't space
        .replace(/[^a-zA-Z\d\s:]/g, '')
        // replace space with "-"
        .replace(new RegExp(" ", 'g'), '-')
        .toLowerCase();
};

/*ArticleSchema.pre('save', function (next) {
    console.log('here i am');
    const article = this;

    // only if title has been modified or is a new title (i.e. new article)
    if (!article.isModified('title')) return next();

    article.model('Article').find({}, function (err, articles) {
        if(err) return next(err);
        const defaultSlug = article.defaultSlug();
        if (!articles) {
            article.articleSlug = defaultSlug;
        } else {
            const articleSlugEndings = articles.reduce((result, article) => {
                const slug = article.articleSlug;
                if (article.articleSlug.startsWith(defaultSlug)) {
                    // Get all chars after defaultSlug
                    try {
                        // This still guarantees uniqueness if somehow we don't have an integer at the end of the slug
                        // title because we will be appending an integer
                        const afterChars = slug.substring(slug.indexOf(defaultSlug) + defaultSlug.length, slug.length)
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
                const ending = (Math.max(articleSlugEndings) + 1);
                article.articleSlug = defaultSlug + ending;
            }
            // didn't find an articleSlugs with the same prefix so we are okay to use this one
            // as the prefix
            article.articleSlug = defaultSlug;
        }
    });

    return next();
});*/

ArticleSchema.methods.getArticleSlug = function(cb) {
    const self = this;
    self.model('Article').find({}, function (err, articles) {
        const defaultSlug = self.defaultSlug();
        let maxAtLeast = false;
        if (!articles) {
            return cb(defaultSlug)
        } else {
            const articleSlugEndings = articles.reduce((result, article) => {
                const slug = article.articleSlug;
                if (slug && slug.startsWith(defaultSlug)) {
                    maxAtLeast = 1;
                    console.log('here 4');
                    // Get all chars after defaultSlug
                    try {
                        // This still guarantees uniqueness if somehow we don't have an integer at the end of the slug
                        // title because we will be appending an integer
                        const afterChars = slug.substring(
                            slug.indexOf(defaultSlug) + defaultSlug.length, slug.length);
                        console.log('here 4.5', slug, slug.substring(
                            slug.indexOf(defaultSlug) + defaultSlug.length, slug.length));
                        if (afterChars) {
                            console.log('here 4.75', afterChars);
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
                console.log(articleSlugEndings, Math.max(articleSlugEndings));
                console.log('here 5.5');
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


/*ArticleSchema.path('title').validate({
 isAsync: true,
 validator: function (title_val, cb) {
 Article.find({},
 function (err, articles) {
 if(err) {
 return cb(false, 'There was an error checking if article with that title already exists')
 }
 if(articles) {
 const currentTitleSlug = Article.createArticleSlug(title_val);
 articles.forEach((article) => {
 if(Article.createArticleSlug(article.title) === currentTitleSlug) {
 return cb(false, `An article with this title "${title_val}" => "${article.title}" already exists. Please choose a different one`);
 }
 });
 // All articles found didn't have the same title so we are good
 return cb(true)
 } else {
 // No articles found with this title
 return cb(true)
 }
 });

 },
 message: 'An article with that title already exists. Please choose a different title'
 });*/


const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
