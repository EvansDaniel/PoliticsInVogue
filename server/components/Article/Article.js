const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:  {
        type: String,
        trim: true
    },
    normalizedTitle: {
        type: String,
        trim: true,
        validate: {
            validator: function(field, cb) {
                return cb(true);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    author: {
        type: String,
        default: 'Sophie Clark',
        trim: true
    },
    body: String,
    hidden: Boolean,
    disableComments: Boolean,
    draft: Boolean,
    trashed: Boolean, // Keep???
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

ArticleSchema.methods.addNormalizedTitle = function (title) {
    this.normalizedTitle = title
        // TODO: possibly need to update this
        // replace all non-alphanumeric characters
        // that isn't space
        .replace(/[^a-zA-Z\d\s:]/g, '')
        // replace space with "-"
        .replace(new RegExp(" ", 'g'), '-')
        .toLowerCase();
};

const Article = mongoose.model('Article', ArticleSchema);

ArticleSchema.path('normalizedTitle').validate({
    isAsync: true,
    validator: function (value, cb) {
        Article.findOne({
                normalizedTitle: value,
                createdAt: new Date("2018-01-09T07:05:37.630Z")
            },
            function (err, article) {
            console.log(article);
            return cb(true);
        });

    },
    message: 'Custom error message!' // Optional
});

module.exports = Article;