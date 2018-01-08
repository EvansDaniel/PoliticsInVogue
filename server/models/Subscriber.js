const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
    email: {
        type: String,
        require: true,
        index: {unique: true},
        trim: true
    },
    lastEmail: Date,
    // TODO: look up enums in mongoose
    emailFrequency: Number
}, {
    timestamps: true
});