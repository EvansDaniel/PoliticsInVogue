const Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

const ArticleCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
    }
});

const ArticleCategory = Mongoose.model('ArticleCategory', ArticleCategorySchema);

module.exports = ArticleCategory;

