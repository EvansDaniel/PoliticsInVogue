const Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

const ArticleCategorySchema = new Schema({

});

const ArticleCategory = Mongoose.model('ArticleCategory', ArticleCategorySchema);

module.exports = ArticleCategory;

