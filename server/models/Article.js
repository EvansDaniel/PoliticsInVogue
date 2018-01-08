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
    body:   String,
    // comments: [{ body: String, date: Date }],
    // Date.now is not called???
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    disableComments: Boolean,
    draft: Boolean,
    trashed: Boolean, // Keep???
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