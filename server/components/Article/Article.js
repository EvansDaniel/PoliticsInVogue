const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:  {
        type: String,
        trim: true
    },
    author: {
        type: String,
        default: 'Sophie Clark',
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ArticleCategory'
    },
    body: String,
    hidden: Boolean,
    allowComments: Boolean,
    draft: Boolean,
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

/*
ArticleSchema.methods.addArticleSlug = function () {
    const slugTitle = this.title
        // TODO: possibly need to update this
        // replace all non-alphanumeric characters
        // that isn't space
        .replace(/[^a-zA-Z\d\s:]/g, '')
        // replace space with "-"
        .replace(new RegExp(" ", 'g'), '-')
        .toLowerCase();
    console.log(this.toObject());
    const createdAt = new Date(this.createdAt),
        year = createdAt.getFullYear(),
        month = createdAt.getMonth() + 1;
    this.articleSlug = `/${year}/${month}/${slugTitle}`;
};
*/

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