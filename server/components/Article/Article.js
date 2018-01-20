const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:  {
        type: String,
        required: [true, 'Article title is required'],
        trim: true
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
        }, 'You must provide a category for the article before it is published'],
    },
    showcaseImage: {
        // TODO: write an image url validator
        type: String
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
    trashed: { // Keep???
        type: Boolean,
        default: false,
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

const Article = mongoose.model('Article', ArticleSchema);

/*ArticleSchema.path('slugTitle').validate({
    isAsync: true,
    validator: function (value, cb) {
        Article.findOne({
                slugTitle: value,
                createdAt: new Date("2018-01-09T07:05:37.630Z")
            },
            function (err, article) {
            console.log(article);
            return cb(true);
        });

    },
    message: 'Custom error message!' // Optional
});*/

module.exports = Article;